const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const app = express();
require('dotenv').config();
const env = process.env;
app.use(bodyParser.json());
app.use(cors);

const client = mysql.createConnection({
    //host: 'localhost', <-これだとmy.cnfにあるbind-addressの設定により接続できない．
    host: '127.0.0.1',
    user: 'node',
    password: env.PASS,
    port : 3306,
    database: 'sample'
});

client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + client.threadId);
});

// read 
app.get('/user', (req, res) => {
    client.query('SELECT * from user;', (err, rows, fields) => {
        if (err) throw err;
      
        res.send(rows);
    });
});

// create 
app.post('/user/create', (req, res) => {
    const name = req.body.name;
    const status = req.body.status;
    client.query('INSERT INTO user SET ?', {name: name, status: status}, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// update 
app.put('/user/update', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    client.query('UPDATE user SET status = ? WHERE id = ?', [status, id], (err, result) => {
        if (err) throw err;
        client.query('SELECT * from user;', (err, rows, fields) => {
            if (err) throw err;
            res.send(rows);
        });
    })
});

// delete 
app.delete('/user/delete', (req, res) => {
    const id = req.body.id;
    client.query(`DELETE FROM user WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
        client.query('SELECT * from user;', (err, rows, fields) => {
            if (err) throw err;
            res.send(rows);
        });
    });
});

app.listen(3001, () => console.log('Listening on port 3001!'))