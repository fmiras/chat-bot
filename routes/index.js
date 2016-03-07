var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res, next) {
  res.sendFile(path.resolve('views/index.html'));
});

router.get('/chat', function (req, res, next) {
  res.sendFile(path.resolve('views/chat.html'));
});

router.get('/bot', function (req, res, next) {
  res.sendFile(path.resolve('views/bot.html'));
});

module.exports = router;
