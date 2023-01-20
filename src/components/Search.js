import React, { useState } from 'react'
import { TextField } from '@mui/material'
import './../styles/Search.css'
import Headlines from './Headlines'
import { useLocation } from 'react-router-dom'

const Search = ({ url }) => {
    const location=useLocation()
    const [textSearch, setTextSearch] = useState("")
    const [urlProp, setUrlProp]=useState(url)
    const handleSearch=()=>{
        const todaysDate=new Date();
        let day=todaysDate.getDay();
        let month=todaysDate.getMonth()+1;
        let year=todaysDate.getFullYear();
        setUrlProp(`https://newsapi.org/v2/top-headlines?q=+${textSearch}&from=${year}-${month}-${day}&country=in&sortBy=popularity&apiKey=103a1879ea8a49aa924f080c8d82cc58`)
    }

    return (
        <div>
            <div className='textField'>
                <TextField value={textSearch} onChange={(e) => { setTextSearch(e.target.value); handleSearch()}} sx={{ backgroundColor: "white", width: "100%" }} id="outlined-basic" label="Search in NewsByte" variant="outlined" />
            </div>
            <div>
                <Headlines url={urlProp} />
            </div>
        </div>
    )
}

export default Search