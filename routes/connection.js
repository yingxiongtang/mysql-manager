var express = require('express');
var router = express.Router();
var mysql = require('mysql');
router.post('/connectDB', function (req, res, next) {
  const connectObject = {
    host: req.body.host,
    user: req.body.user,
    password: req.body.password,
    database: req.body.database,
  }

  var connection = mysql.createConnection(connectObject);

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      res.sendStatus(500)
    }
    console.log('connected as id ' + connection.threadId);
    res.cookie('connection', JSON.stringify(connectObject))
    res.sendStatus(200)
  });
  connection.on('error', function (err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
  });
});

module.exports = {
  router,

  makeConnection: function (s) {
    var connect = JSON.parse(s);
    console.log("Connection: " + connect);
    var connection = mysql.createConnection(connect);
    return connection;
  }
};


