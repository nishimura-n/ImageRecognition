const router = require("express").Router();
const db = require('../db.js');

//データベースの一覧を表示
router.get('/', (req, res) => {
    db.query('SELECT * from users_file;', (err, rows, fields) => {
        if (err) throw err;
      
        res.send(rows);
    });
});

module.exports = router;