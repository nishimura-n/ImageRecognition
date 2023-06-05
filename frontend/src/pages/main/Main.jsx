import React from 'react'
import Header from '../../components/header/Header'
import Home from '../../components/home/Home'
import Login from '../login/Login'
import { useSelector } from 'react-redux'

function Main() {
  const isAuth = useSelector((store)=>store.isLogin.isAuthenticate)
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
