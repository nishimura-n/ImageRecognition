import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

//あああ
function App() {
 const [categoryList, setCategoryList] = useState([]);
 const [name_id, setName_id] = useState("");
 const [status_id, setStatus_id] = useState("");
 const [update_status, setUpdate_status] = useState("");
 const [update_id, setUpdate_id] = useState("");
 const [id, setId] = useState("");

const handleChangeName = (e) => {
  setName_id(e.target.value);
}

const handleChangeStatus = (e) => {
  setStatus_id(e.target.value);
}

const handleChangeUpdateStatus = (e) => {
  setUpdate_status(e.target.value);
}

const handleChangeUpdateid = (e) => {
  setUpdate_id(e.target.value);
}

const handleChangeId = (e) => {
  setId(e.target.value);
}


 useEffect(() => {
   axios.get("http://localhost:3001/user").then((response) => {
     setCategoryList(response.data);
   });
 }, [categoryList]);

 const handlecreate = () => {
  try {
    axios.post(`http://localhost:3001/user/create`, {name: name_id, status: status_id},)
  }catch(err){
    console.log(err);
  }
}

const handledelete = () => {//deleteだけaxiosの書き方が違う．
  try {
    const url = 'http://localhost:3001/user/delete'
    const payload = {
      id: id
    }
    axios.delete(url, {
      data: payload
    }) // 正常にAPIコールできる
  } catch(e) {
    console.error(e)
  }
}

const handleupdate = () => {
  try {
    axios.put(`http://localhost:3001/user/update`, {status: update_status, id : update_id},)
  }catch(err){
    console.log(err);
  }
}

  return (
    <div className="App">
     <ul>
       {categoryList.map((val, index) => {
         return <li key={index}>id→{val.id} | name→{val.name} | status→{val.status}</li>
       })}
     </ul>
     <form onSubmit={handlecreate}>
     <input type = "text" onChange={handleChangeName} value={name_id} placeholder={"作成したい名前を入れて"}/>
     <input type = "text" onChange={handleChangeStatus} value={status_id} placeholder={"作成したい状態を入れて"}/>
     <input type="submit" value="create" />
     </form>
     <br/>
     <form onSubmit={handleupdate}>
     <input type = "text" onChange={handleChangeUpdateStatus} value={update_status} placeholder={"更新したい状態を入れて"}/>
     <input type = "number" onChange={handleChangeUpdateid} value={update_id} placeholder={"更新したいIDを入れて"}/>
     <input type="submit" value="update" />
     </form>
     <br/>
     <form onSubmit={handledelete}>
     <input type = "number" onChange={handleChangeId} value={id} placeholder={"削除したいIDを入れて"}/>
     <input type="submit" value="delete" />
     </form>
    </div>
  );
}

export default App;