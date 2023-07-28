import React,{useState,useEffect, ChangeEvent, FormEvent} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Data from '../data/Data'
import "./Home.css"
import axios from "axios";

function Home() {
  const [value,setValue] = useState<number|null>(null);
  // fileは状態の型がFileとnullのどちらかを取りうる可能性がある
  // Union types適用
  const [file,setFile] = useState<File|null>(null);
  // number型を定義
  const [ans,setAns] = useState<number>(-1);
  const [image, setImage] = useState('./default.png');
  const [img_src, setImg_src] = useState("");

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setFile(fileObject);
    setImage(window.URL.createObjectURL(fileObject));
  };

  //最新の画像を表示するために場合に分けた値を代入
  useEffect(() => {
    setValue(1);//データベースの画像を表示ボタンからの表示の場合
    // console.log(img_src)
  }, [img_src]);
  useEffect(() => {
    setValue(2);//アップロードによる画像の表示の場合
    // console.log(image)
  }, [image]);

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    //リロードをしないようにする．
    //e.preventDefault();
    //FormDataでfileを取得する．

    // 条件分岐を記述することによって型ガードを適用
    // 理由:変数fileをUnion Typesに指定しているためエラーが出力されるから
    if(file !== null){
      const form = new FormData();
      form.append("file", file);
        try{
          //image/uploadのapiを実行
          await axios.post("http://localhost:5005/image/upload", form);
        }catch(err){
            console.log(err);
        }
      }
  }

  const handleClick = async() => {
    const bodyData = {
      image_url: value === 1 ? img_src : image, // 仮の画像URL
    };
    console.log(bodyData)
    fetch('http://localhost:5004/image/judgement', {
    method: 'POST',
    mode: 'cors', // リクエストモードを指定
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
    .then(response => response.json())
    .then(data => {
      // レスポンスデータを処理
      setAns(data)
      console.log(data);
    })
    .catch(error => {
      // エラーハンドリング
      console.error('Error:', error);
    });
  }
  return (
    <div className="homeContainer">
      <p> <strong>Select Image</strong></p>
      <div className="uploadImage">
        <div className="cloudIcons">
          <CloudUploadIcon color="primary" fontSize="large"/>
        </div>
        <div className="imageContainer">
          <div className="imageText">
            <p>画像ファイルを選択してください</p>
            <p>拡張子: png, jpeg</p>
          </div>

          <div className="imageButton">

          {/* ボタンを押したらhandleSubmit()を実行 */}
          <form onSubmit={(e) => handleSubmit(e)}>
             {/* fileを取得してonFileInputChangeを実行 */}
             <input type="file" name="file" accept=".png, .jpeg, .jpg" onChange={onFileInputChange}/>
             <button type="submit" style={{color:"white"}}>画像をアップロード</button>
          </form >

          </div>
        </div>
      </div>
       {/* データベースのデータを表示(課金によるメリットとして扱う可能性あり) */}
       <Data setImg_src = {setImg_src}/>
          <div className="outputImage">
            <p> <strong>Input Image</strong></p>
            {/* 一番最近に更新した画像を表示する */}
            {value === 1 && (
               <img src={"/images/"+img_src} alt=""/>
            )}
            {value === 2 && (
               <img src={image} alt=""/>
            )}
          </div>
          <div className="outputPrice">
            <p style={{color:"white"}}> <strong>classification</strong></p>
            <p style={{color:"white"}}>(飛行機，自動車，鳥，猫，鹿，犬，蛙，馬，船，トラックの10種類の中から判別します)</p>
            {value === 1 && (
               <>
               <button onClick={handleClick} style={{color:"white"}}>予測を表示</button>
               {ans === 0 && (
               <p>この画像は飛行機と推測されます．</p>
               )}
               {ans === 1 && (
               <p>この画像は自動車と推測されます．</p>
               )}
               {ans === 2 && (
               <p>この画像は鳥と推測されます．</p>
               )}
               {ans === 3 && (
               <p>この画像は猫と推測されます．</p>
               )}
               {ans === 4 && (
               <p>この画像は鹿と推測されます．</p>
               )}
               {ans === 5 && (
               <p>この画像は犬と推測されます．</p>
               )}
               {ans === 6 && (
               <p>この画像は蛙と推測されます．</p>
               )}
               {ans === 7 && (
               <p>この画像は馬と推測されます．</p>
               )}
               {ans === 8 && (
               <p>この画像は船と推測されます．</p>
               )}
               {ans === 9 && (
               <p>この画像はトラックと推測されます．</p>
               )}
               </>
            )}
            {value === 2 && (
               <>
               <button onClick={handleClick} style={{color:"white"}}>予測を表示</button>
               {ans === 0 && (
               <p>この画像は飛行機と推測されます．</p>
               )}
               {ans === 1 && (
               <p>この画像は自動車と推測されます．</p>
               )}
               {ans === 2 && (
               <p>この画像は鳥と推測されます．</p>
               )}
               {ans === 3 && (
               <p>この画像はねこと推測されます．</p>
               )}
               {ans === 4 && (
               <p>この画像はシカと推測されます．</p>
               )}
               {ans === 5 && (
               <p>この画像は犬と推測されます．</p>
               )}
               {ans === 6 && (
               <p>この画像はカエルと推測されます．</p>
               )}
               {ans === 7 && (
               <p>この画像は馬と推測されます．</p>
               )}
               {ans === 8 && (
               <p>この画像は船と推測されます．</p>
               )}
               {ans === 9 && (
               <p>この画像はトラックと推測されます．</p>
               )}
               </>
            )}
          </div>

    </div>
  )
}

export default Home
