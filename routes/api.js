var express = require('express');
var router = express.Router();
var connect = require("./connection");
router.post('/table', function (req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    let buildString = "CREATE TABLE " + req.body.tableName + "(";
    req.body.rows.forEach(element => {
        buildString = buildString + element.itemName + " " + element.dataTypePretty + ", "
    });
    buildString = buildString.slice(0, -2);
    buildString = buildString + ");";
    console.log(buildString)
    connection.query(buildString, function (err, dbRes, fields) {
        if (err) {
            console.log(err)
            res.send(400)
            return;
        } else {
        console.log(res)
        res.send(200)
        }
    })
});

module.exports = router;