var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var Promise = require('es6-promise').Promise;

function DataManager (options) {

  this.dbHandle = options.db;
  this.initialized = false;
  this.initializeStore();
}

DataManager.prototype = {

  constructor: DataManager,

  initializeStore: function () {
    var t = this;
    this.dbHandle.createCollection('verses', {strict: true}, function (err, collection) {
      t.initialized = true;
    });
  },

  addVerse: function (verse) {

    var id = ObjectId();
    var dbHandle = this.dbHandle;
    console.log(id);

    return new Promise(function (resolve, reject) {
      dbHandle.collection('verses').insertOne({
        _id: id,
        verse: verse
      }, function (err, result) {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  },

  validateVerse: function () {

  },

  getVersePage: function (startIndex, pageSize) {

		var dbHandle = this.dbHandle;
    return new Promise(function (resolve, reject) {
      var verseArr = [];
      var cursor = dbHandle.collection('verses').find().skip(startIndex).limit(pageSize);
      cursor.each(function (err, doc) {
        if (err) {
          reject(err);
        }

        if (doc != null) {
           verseArr.push(doc);
        } else {
           resolve(verseArr);
        }
      });
    });
  },

  getAllVerses: function () {

		var dbHandle = this.dbHandle;
    return new Promise(function (resolve, reject) {
      var verseArr = [];
      var cursor = dbHandle.collection('verses').find();
      cursor.each(function (err, doc) {
        if (err) {
          reject(err);
        }

        if (doc != null) {
           verseArr.push(doc);
        } else {
           resolve(verseArr);
        }
      });
    });
  },

  getTotalVerseCount: function () {
    var dbHandle = this.dbHandle;

    return new Promise(function (resolve, reject) {
      dbHandle.collection('verses').count(function (err, count) {
        if (err) {
          reject(err);
        }

        resolve(count);
      });
    });
  }

}

module.exports = function (options) {

  var dataManager = new DataManager(options);
  var router = express.Router();

  router.post('/addVerse', function (req, res, next) {
    var reqBody = req.body;
    var verse = [reqBody.firstLine, reqBody.secondLine]

    dataManager.addVerse(verse)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  router.get('/count', function (req, res, next) {
    dataManager.getTotalVerseCount()
      .then(function (result) {
        res.status(200).send({count: result});
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

	router.get('/versePage', function (req, res, next) {

		var pageNum = Number(req.query.pageNum),
			pageSize = Number(req.query.pageSize),
			totalCount = 0;

		dataManager.getTotalVerseCount()
      .then(function (result) {

				totalCount = result;

				var totalPages = Math.ceil(result / pageSize),
					lastPage = result % pageSize,
					offset = 0;

				if (pageNum < 0) {
					if (pageNum === -1 && (lastPage < (pageSize / 2))) {
						offset = lastPage;
						pageNum = totalPages + pageNum - 1;
					}
					else {
						pageNum = totalPages + pageNum;
					}
				}

				if (pageNum >= 0 && pageNum < totalPages) {
					return dataManager.getVersePage(pageNum * pageSize, pageSize + offset);
				}
				else {
					console.log(pageNum, pageSize, offset);
					throw new Error({message: 'You are requesting an invalid page!'});
				}

      })
			.then(function (result) {
				res.status(200).send({verses: result, totalCount: totalCount});
			})
      .catch(function (err) {
				console.log(err);
        res.status(500).send(err);
      });
	})

  router.get('/allVerses', function (req, res, next) {

		var count = 0;

		dataManager.getTotalVerseCount()
			.then(function (result) {
				count = result;
				return dataManager.getAllVerses()
			})
      .then(function (result) {
        res.status(200).send({verses: result, totalCount: count});
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  return router;
}
