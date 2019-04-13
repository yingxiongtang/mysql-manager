var express = require('express');
var router = express.Router();
var connect = require("./connection");

router.get('/columnNames', function(req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    console.log(req.query);
    let buildString = `SHOW COLUMNS FROM ${req.query.name}`

    console.log(buildString)
    connection.query(buildString, function (err, dbRes, fields) {
        if (err) {
            console.log(err)
            res.send(400)
            return;
        } else {
            let resObj = [];
            dbRes.forEach(element => {
                if (element.Extra !== "auto_increment"){
                    resObj.push([element.Field,element.Type, element.Extra])
                }
            });
            console.log("Res object" + resObj)
            res.send(resObj)
        }
    })
})

router.get('/viewTables', function (req, res, next) {
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

router.post('/viewRows', function (req, res, next) {

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

router.post('/table', function (req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    let buildString = "CREATE TABLE " + req.body.tableName + "(id int NOT NULL AUTO_INCREMENT,";
    req.body.rows.forEach(element => {
        buildString = buildString + element.itemName + " " + element.dataTypePretty + ", "
    });
    buildString = buildString + "PRIMARY KEY (id));";
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

router.post('/row', function(req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    let id = false;
    let buildString = `INSERT INTO ${req.body.data.name}(`
    req.body.data.fields.forEach(element => {
        if (element[0] === 'id'){
            id=true;
        } else {
        buildString = buildString + element[0] + ","
        }
    });
    buildString = buildString.slice(0, -1) + ') VALUES ('
    req.body.data.input.forEach(element => {
        if (id) {
            id=false;
        } else {
        buildString = buildString + "'"+element + "',"
        }
    });
    buildString = buildString.slice(0, -1) + ')'

    connection.query(buildString, function (err, dbRes, fields) {
        if (err) {
            console.log(err)
            res.send(400)
            return;
        } else {
            res.send(200)
        }
    })
})

router.delete('/row', function (req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    let buildString = `DELETE FROM ${req.body.tableName} WHERE ${req.body.rowIndex[1]}='${req.body.rowIndex[0]}'`
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
})

router.delete('/table', function (req, res, next) {
    try {
        var connection = connect.makeConnection(req.cookies.connection);
    } catch (err) {
        console.log(err)
        res.send(err)
        return;
    }

    let buildString = `DROP TABLE ${req.body.tableName}`
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
})

module.exports = router;