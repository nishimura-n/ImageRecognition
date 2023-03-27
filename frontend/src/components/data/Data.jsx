import React,{useState, useEffect} from 'react'
import axios from "axios";
import "./Data.css"

function Data(props) {
  const [categoryList, setCategoryList] = useState([]);

  //画像を表示ボタンの処理
  const handleClick = (option) => {
    return(
      <>
       {props.setImg_src(option)}
      </>
    )
  }

  //削除ボタンの処理
  const handledelete = (image_id,image_src) => {//deleteだけaxiosの書き方が違う．
  try {
    const url = 'http://localhost:5005/image/delete'
    const payload = {
      id: image_id,
      src: image_src
    }
    axios.delete(url, {
      data: payload
    }) // 正常にAPIコールできる
  } catch(e) {
    console.error(e)
  }
}

   //画像の一覧データを取得
   useEffect(() => {
       axios.get("http://localhost:5005/image/read").then((response) => {
       setCategoryList(response.data);
     });
   }, [categoryList]);

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