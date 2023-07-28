import React from 'react'
import "./Header.css";
import DehazeIcon from '@mui/icons-material/Dehaze';

function Header() {
  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <span className="logo">Image Recognition</span>
      </div>

      <div className='headerRight'>
        <DehazeIcon color="secondary"/>
      </div>
    </div>
  )
}

export default Header
