import React from 'react'
import {useRef} from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useDispatch } from 'react-redux'
import { setAuthLogin } from '../../feature/AuthSlice';

function Login() {
  const username = useRef("");
  const pass = useRef("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const loginData = {
        username:e.target["username"].value,
        password:e.target["password"].value
      }
      await axios.post("/api/auth/login",loginData);
      const response = await axios.get("/api/auth");
      console.log("Login.js:"+response.data)
      if(response.data){
        dispatch(setAuthLogin(true))
        navigate("/main")
      }else{

      }
    }catch(err){
      console.log(err);
    }
  }

  const main =
    <body className="log">
      <div className="formContainer">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h1>ログイン</h1>
          <hr/>
          <div className="uiForm">
            <div className="formField">
              <label>ユーザ名: </label>
              <input type="text" placeholder="ユーザ名" name="username" require ref={username}/>
            </div>
            <div className="formField">
              <label>パスワード : </label>
              <input type="password" placeholder="パスワード" name="password" ref={pass}/>
            </div>
            <button className="loginButton">ログイン</button>
          </div>
        </form>
      </div>
    </body>
  return (
    <>
    {main}
    </>
  )
}

export default Login
