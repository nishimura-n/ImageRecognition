import React, {FormEvent} from 'react'
import {useRef} from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useDispatch } from 'react-redux'
// import { setAuthLogin } from '../../feature/AuthSlice';

const Login: React.FC=()=> {
  // <input>参照型
  // メリット: RefオブジェクトがHTMLInputElement型の要素を参照することが保証される
  const username = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // "e"はHTMLFormElement型のイベントであることを保証する
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
      const loginData = {
        username:(e.currentTarget["username"]).value,
        password:(e.currentTarget["password"]).value
      }
      await axios.post("/api/auth/login",loginData);
      const response = await axios.get("/api/auth");
      console.log("Login.js:"+response.data)
      if(response.data){
        // dispatch(setAuthLogin(true))
        navigate("/main")
      }else{

      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <body className="log">
      <div className="formContainer">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <h1>ログイン</h1>
          <hr/>
          <div className="uiForm">
            <div className="formField">
              <label>ユーザ名: </label>
              <input type="text" placeholder="ユーザ名" name="username" required ref={username}/>
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
  );
}

export default Login
