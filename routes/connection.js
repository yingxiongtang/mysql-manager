var express = require('express');
var router = express.Router();
var mysql = require('mysql');
router.post('/', function (req, res, next) {
  console.log(req.body)

  var connection = mysql.createConnection({
    host: req.body.host,
    user: req.body.user,
    password: req.body.password,
    database: req.body.database
  });

  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      res.sendStatus(500)
    }
    console.log('connected as id ' + connection.threadId);
    res.sendStatus(200)
    // fs.writeFile(path, data, { flag: 'wx' }, function (err) {
    //     if (err) throw err;
    //     console.log("It's saved!");
    // });
    // var data = `{
    //     "host": "${req.body.address}",
    //     "user": "${req.body.user}",
    //     "password": "${req.body.pass}",
    //     "database": "${req.body.db}"
    // }`
    // var jsonData = JSON.parse(data)
    // fs.writeFile("../config.json", JSON.stringify(jsonData), { flag: 'w' }, function (err) {
    //     if (err) throw err;
    //     console.log("it saved")
    // })
  });
  connection.on('error', function (err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
  });
});

module.exports = router;
