const router = require("express").Router();
const fs = require('fs');
const db = require('../db.js');

// delete 
router.delete('/', (req, res) => {
    //データベースで削除するID
    const id = req.body.id;
    //データベースの削除する画像のソース
    const src = req.body.src;
    db.query(`DELETE FROM users_file WHERE id = ?`, [id], (err, result) => {
        if (err) throw err;
    });
    //データベースから削除された画像をローカルでも削除
    fs.unlink('../frontend/public/images/'+src,(error) => {});
});

module.exports = router;