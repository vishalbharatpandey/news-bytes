import React, { useEffect, useState } from 'react'
import './../styles/SideBar.css'
import { Link } from 'react-router-dom'
import { Switch } from '@mui/material'

const SideBar = ({ sidebar, setSidebar }) => {

  const [darkModeSwitch, setDarkModeSwitch] = useState(document.body.style.backgroundColor === 'black')

 useEffect(()=>{
  if(sidebar){
    document.getElementById("screens").style.opacity=0.4
  }
  else{
    document.getElementById("screens").style.opacity=1
  }
 })

  onscroll = () => {
    document.getElementById("sdbar").className = "closedSidebar";
    setSidebar(false)
  }
  const themeChange = (e) => {
    // setDarkModeSwitch(e.target.checked)  
    if (document.body.style.backgroundColor === 'white') {
      document.body.style.backgroundColor = 'black';
      setDarkModeSwitch(true)
    }
    else {
      document.body.style.backgroundColor = 'white';
      setDarkModeSwitch(false)
    }
    document.body.style.backgroundColor === 'white' ? document.body.style.color = 'black' : document.body.style.color = 'white';
  }

  return (
    <div id='sdbar' className={sidebar ? "sidebar" : "closedSidebar"}>
      <div>
        <div onClick={()=>{setSidebar(false)}} className='cross'>&times;</div>
        <div><Link to='/savedArticles'>My articles</Link></div>
        <div className='cursor-pointer'>
          <span>Dark mode
            <Switch
              checked={darkModeSwitch}
              onChange={themeChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </span>
        </div>
      </div>
    </div>
  )
}

export default SideBar