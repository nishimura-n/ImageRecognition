const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const Route_image_upload = require("./Route_image/upload");
const Route_image_read = require("./Route_image/read");
const Route_image_delete = require("./Route_image/delete");
const client = require('./db.js');

//データベースにアクセス
client.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + client.threadId);
});

//ミドルウェア
app.use(bodyParser.json());// body-parser middleware use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);//CORSは、制約を一部解除し、異なるオリジン間でリソースを共有するための仕組み
app.use("/image/upload", Route_image_upload);//画像アップロード
app.use("/image/read", Route_image_read);//画像パス表示
app.use("/image/delete", Route_image_delete);//画像を削除

app.listen(5005, () => console.log('Listening on port 5005!'))