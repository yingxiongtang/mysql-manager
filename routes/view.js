var express = require('express');
var router = express.Router();
var connect = require("./connection");
router.get('/', function (req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
        var tables;
        var db;
        connection.query('show tables;', function (err, rows, fields) {
            tables = rows;
            connection.query('SELECT DATABASE() FROM DUAL;', function(err, rows, fields) {
                db = rows;
                res.send([tables, db]);
                connection.end();
            })
        });
    } catch (err) {
        console.log(err)
    }
});

router.post('/table', function (req, res, next) {

    console.log(req.body.data);
    try {
        var connection = connect.makeConnection(req.cookies.connection);
        connection.query(`SELECT * FROM ${req.body.data}`, function (err, rows, fields) {
            res.send(rows);
            connection.end();
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
