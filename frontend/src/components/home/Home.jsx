import React,{useState} from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./Home.css"
import SplitPane from 'react-split-pane';

function Home() {
  const [image, setImage] = useState('./default.png');
  const onFileInputChange = (e) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setImage(window.URL.createObjectURL(fileObject));
  };

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
            <input type="file" accept="image/*" onChange={onFileInputChange} />
          </div>
        </div>
      </div>

        <SplitPane split="vertical" minSize={50} maxSize={50} defaultSize="50%">
          <div className="outputImage">
            <p> <strong>Input Image</strong></p>
            <img src={image} />
          </div>
          <div className="outputPrice">
            <p style={{color:"white"}}> <strong>Price</strong></p>
          </div>
        </SplitPane>

    </div>
  )
}

export default Home
