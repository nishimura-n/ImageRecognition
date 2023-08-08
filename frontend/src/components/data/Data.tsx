import React,{useState, useEffect} from 'react'
import axios from "axios";
import "./Data.css"

// propsにstring指定してるのにhandleClickの引数内でstringを指定する理由 7/27
type DataProps = {
  setImg_src:(option: string) => void;
};

interface img_Data{
  id:number,
  file_src:string
}

function Data(props:DataProps) {
  const [categoryList, setCategoryList] = useState<img_Data[]>([]);

  //画像を表示ボタンの処理
  const handleClick = (option:string) => {
    props.setImg_src(option)
  }

  //削除ボタンの処理
  const handledelete = (image_id:number,image_src:string) => {//deleteだけaxiosの書き方が違う．
  try {
    const url = 'http://localhost:5005/image/delete'
    const payload = {
      id: image_id,
      src: image_src
    }
    axios.delete(url, {
      data: payload
    }) // 正常にAPIコールできる
    axios.get("http://localhost:5005/image/read")
      .then((response) => {
        const newData = response.data;
        setCategoryList(newData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch(e) {
    console.error(e)
  }
}

   //画像の一覧データを取得
   useEffect(() => {
    axios.get("http://localhost:5005/image/read")
      .then((response) => {
        const newData = response.data;
        setCategoryList(newData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return(
    <div className="DataContainer">
      <ul>
        {/* データベースの一覧を表示 */}
        {categoryList.map((val, index) => {
          return(
            <li style={{color:"white"}} key={index}>
              id→{val.id} | file_src→{val.file_src}
              <button style={{color:"white"}} onClick={() => handleClick(val.file_src)}>画像を表示</button>
              <button style={{color:"white"}} onClick={() => handledelete(val.id,val.file_src)}>削除</button>
            </li>
          )
         })}
      </ul>
    </div>
  )
}

export default Data
