var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', function(req, res, next) {
  res.render('index', {
    env: process.env.NODE_ENV,
		nep: JSON.stringify(req.nep)
  });
});

module.exports = router;
