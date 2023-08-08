import React from 'react'
import Header from '../../components/header/Header.tsx'
import Home from '../../components/home/Home'
import Login from '../login/Login.tsx'
import { useAppSelector } from './../../hooks.ts'

function Main() {
  // store.isLoginでいい理由は？
  const isAuth = useAppSelector((store)=>store.isLogin)
  console.log("ログイン:"+isAuth)
  if(!isAuth){
    return <Login/>
  }else{
    return(
      <div className="main">
        <Header/>
        <Home/>
      </div>
    )
  }
}

export default Main
