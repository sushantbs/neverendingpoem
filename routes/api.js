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

  getVerses: function (startIndex, endIndex) {

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

  router.get('/allVerses', function (req, res, next) {
    dataManager.getAllVerses()
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  return router;
}
