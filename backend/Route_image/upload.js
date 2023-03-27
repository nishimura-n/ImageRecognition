const router = require("express").Router();
const multer = require("multer");
const db = require('../db.js');

//multerを使う
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        //画像の保存場所
        callBack(null, '../frontend/public/images')
    },
    filename: (req, file, callBack) => {
        //名前を分割して，同じ名前のfileでも別として扱う．
        let exploded_name = file.originalname.split(".");
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var hour = today.getHours();
        var minute = today.getMinutes();
        var second = today.getSeconds();
        callBack(null, exploded_name[0] + year + "-" + month + "-" + day + "-" + hour + "-" + minute + "-" + second
        + "." + exploded_name[1])
    }
})

const upload = multer({storage});
//画像アップロードapi
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        //console.log(req.file);
        console.log(req.file.filename)
        //ファイルのソース(データベース保存用)を設定
        //var imgsrc = 'http://127.0.0.1:5005/images/' + req.file.filename
        var imgsrc = req.file.filename
        //データベースに保存するSQL文
        var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

module.exports = router;