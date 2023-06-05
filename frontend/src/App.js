import React from "react";
import "./App.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login/>}/>
        <Route path="/main" element={ <Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
