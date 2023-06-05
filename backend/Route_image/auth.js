const router = require("express").Router();
const db = require('../db.js');
const express = require("express");
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const session = require("express-session");

router.use(express.urlencoded( { extended: true }))

// passport.use実装
passport.use("local",new LocalStrategy(
  async (username, password, done) => {
    try{
      db.query('SELECT * FROM users WHERE username = ?', [username],function(err, rows){
        //connection.queryの実行中のエラーが発生した場合
        if(err) return done(err);
        //DBから取得した結果の'rows'が空である場合、認証を失敗として処理
        if(!rows.length) return done(null, false);
        //rowsはadminテーブルの全ての行を表す
        if(rows[0].password !== password) return done(null,false)
        return done(null, username)
    });
  }catch(err){
    return done(err);
  }
}))

passport.serializeUser((username,done)=>{
  console.log("serializeUser:"+username)
  done(null,username)
})

passport.deserializeUser((username,done)=>{
  console.log("deserializeUser:"+username)
  done(null,username)
})

router.post("/login", passport.authenticate('local',{
  failureRedirect: '',
  session: true,
  }),(req,res)=>{
    return res.redirect(200,'/main')
  }
)

router.get('/', async(req,res)=>{
  console.log("ここだ:"+req.user)
  console.log("ここです:"+JSON.stringify(req.session))
  if(req.user){
    return res.send(req.user);
  }
  else{
    return res.send(false);
  }
});

module.exports = router;
