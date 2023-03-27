const mysql = require('mysql');
require('dotenv').config();
const env = process.env;

const client = mysql.createConnection({
    //host: 'localhost', <-これだとmy.cnfにあるbind-addressの設定により接続できない．
    host: '127.0.0.1',
    user: 'node',
    password: env.PASS,
    port : 3306,
    database: 'sample'
});

module.exports = client;