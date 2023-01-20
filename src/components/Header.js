import React, { useState,useEffect } from 'react'
import { MdHome } from "react-icons/md"
import './../styles/Header.css'
import { TextField } from '@mui/material'
import { FaSearch } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiFilterAlt } from 'react-icons/bi'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Headlines from './Headlines'
import USNews from './USNews'
import BusinessNews from './BusinessNews'
import TechnologyNews from './TechnologyNews'
import HealthNews from './HealthNews'
import SportsNews from './SportsNews'
import Search from './Search'
import SideBar from './SideBar'
import SavedArticles from './SavedArticles'
import FilterModal from './FilterModal'
import CanadaNews from './CanadaNews'
import ScienceNews from './ScienceNews'
import EntertainmentNews from './EntertainmentNews'
import axios from 'axios'

const Header = () => {
  const location = useLocation()
  const [allCategories, setAllCategories] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const [filter, setFilter] = useState(false)
  const [marqueeData,setMarqueeData]=useState([])

  useEffect(()=>{
    axios.get("https://newsapi.org/v2/top-headlines?language=en&category=general&apiKey=103a1879ea8a49aa924f080c8d82cc58").
    then(res=>{setMarqueeData(res.data.articles);console.log('res.data', res.data.articles)})
  },[])

  return (
    <>
      <SideBar sidebar={sidebar} setSidebar={setSidebar} />
      <div className="header">
        <div className='headerItems flex'>
          <div style={{ display: "flex" }}>
            <div className="appName">
              NEWS<b>BYTE</b>
            </div>
            <p style={{ paddingTop: "0.5rem" }}>by Vishal</p>
          </div>
          <div>
            <GiHamburgerMenu onClick={() => setSidebar(!sidebar)} style={{ position: "absolute", right: "20px", cursor: "pointer" }} className='hamburger text-4xl mt-5' />
          </div>
        </div>
        <div>
          <div id='tabs' className="menu text-xl">
            <div className='menuItems flex pt-2'>
              <div className='menuParts'>
                <div className='flex'><MdHome className='mr-1 text-3xl' />
                  <Link to="/home">Home</Link>
                </div>
                <div><Link to="/Business">Business</Link></div>
              </div>
              <div className='menuParts'>
                <div><Link to="/Technology">Technology</Link></div>
                <div><Link to="/Health">Health</Link></div>
              </div>
              <div className='menuParts'>
                <div><Link to="/Sports">Sports</Link></div>
                {/* <div><Link to="/USNews">USA</Link></div> */}
                <div onClick={() => setAllCategories(!allCategories)}>More </div>
              </div>
            </div>
            <div className='textAndSearch flex mt-4'>
              <div><Link to="/search"><div className='flex'>
                <span>Search</span>
                <FaSearch className='search text-black' />
              </div></Link>
              </div>
              <div className='flex'>
                <span onClick={() => setFilter(!filter)} className='ml-7 cursor-pointer'>Filter</span>
                <BiFilterAlt className='filter text-black' />
              </div>
            </div>
          </div>
        </div>
        {allCategories &&
          <div className="text-xl secondaryMenu">
            <div className='menuItemsSecondary flex pt-2'>
              <div><Link to="/Science">Science</Link></div>
              <div><Link to="/Entertainment">Entertainment</Link></div>
              <div><Link to="/CanadaNews">Canada</Link></div>
              <div><Link to="/USNews">USA</Link></div>
            </div>
          </div>
        }
        <div className='marqueeItem' style={{background:"red",color:"white"}}>
          <marquee  width="100%" direction="right" height="30px">
            |<span className='px-3'>{marqueeData[0]?.title}.</span>|
            <span className='px-3'>{marqueeData[1]?.title}.</span>|
            <span className='px-3'>{marqueeData[2]?.title}.</span>|
            <span className='px-3'>{marqueeData[3]?.title}.</span>|
            <span className='px-3'>{marqueeData[4]?.title}.</span>|
            <span className='px-3'>{marqueeData[5]?.title}.</span>|
            <span className='px-3'>{marqueeData[6]?.title}.</span>|
            <span className='px-3'>{marqueeData[7]?.title}.</span>|
            <span className='px-3'>{marqueeData[8]?.title}.</span>|
            <span className='px-3'>{marqueeData[9]?.title}.</span>|
          </marquee>
        </div>
        <div style={{ marginBottom: "10px" }} className='capitalize m-3 ml-4 font-medium border-b-2 pb-1'>
          <p style={{ color: 'red' }}>NewsBYTE -&gt; {location.pathname.length === 1 ? "Home" : location.pathname?.slice(1)}</p>
        </div>
      </div>
      <div id='screens' style={{ marginTop: allCategories ? "110px" : "70px" }}>
        <Routes>
          <Route path='/' element={<Headlines url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=103a1879ea8a49aa924f080c8d82cc58"} />}></Route>
          <Route exact path='/home' element={<Headlines url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=103a1879ea8a49aa924f080c8d82cc58"} />}></Route>
          <Route exact path='/USNews' element={<USNews />}></Route>
          <Route exact path='/CanadaNews' element={<CanadaNews />}></Route>
          <Route exact path='/Business' element={<BusinessNews />}></Route>
          <Route exact path='/Technology' element={<TechnologyNews />}></Route>
          <Route exact path='/Health' element={<HealthNews />}></Route>
          <Route exact path='/Sports' element={<SportsNews />}></Route>
          <Route exact path='/Science' element={<ScienceNews />}></Route>
          <Route exact path='/Entertainment' element={<EntertainmentNews />}></Route>
          <Route exact path='/search' element={<Search url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=103a1879ea8a49aa924f080c8d82cc58"} />}></Route>
          <Route exact path='/savedArticles' element={<SavedArticles />}></Route>
          <Route path='*' element={<Headlines url={"https://newsapi.org/v2/top-headlines?country=in&apiKey=103a1879ea8a49aa924f080c8d82cc58"} />}></Route>
        </Routes>
      </div>
      <FilterModal filter={filter} setFilter={setFilter} marqueeData={marqueeData} setMarqueeData={setMarqueeData} />
    </>
  )
}

export default Header