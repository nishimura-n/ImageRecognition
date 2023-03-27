import React,{useState,useEffect} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Data from '../../components/data/Data'
import "./Home.css"
import SplitPane from 'react-split-pane';
import axios from "axios";

function Home() {
  const [value,setValue] = useState(null);
  const [file,setFile] = useState(null);
  const [image, setImage] = useState('./default.png');
  const [img_src, setImg_src] = useState("");

  const onFileInputChange = (e) => {
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
  }, [img_src]);
  useEffect(() => {
    setValue(2);//アップロードによる画像の表示の場合
  }, [image]);

  const handleSubmit = async(e) => {
    //リロードをしないようにする．
    e.preventDefault();
    //FormDataでfileを取得する．
    const form = new FormData();
    form.append("file", file);
        try{
          //image/uploadのapiを実行
          await axios.post("http://localhost:5005/image/upload", form);
        }catch(err){
            console.log(err);
        }
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
        <SplitPane split="vertical" minSize={50} maxSize={50} defaultSize="50%">
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
            <p style={{color:"white"}}> <strong>Price</strong></p>
          </div>
        </SplitPane>

    </div>
  )
}

export default Home
