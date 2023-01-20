import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, InputLabel, Select, MenuItem,Button } from '@mui/material';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:'10px',
    p: 10,
};

export default function FilterModal({ filter, setFilter,marqueeData,setMarqueeData }) {

    const handleClose = () => setFilter(false);

    const [from, setFrom] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [to, setTo] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [source,setSource]=React.useState("Times of India")
    const [sortBy,setSortBy]=React.useState("Popularity")

    const handleChange = (newValue) => {
        setFrom(newValue);
    };
    const handleChange2 = (newValue) => {
        setTo(newValue);
    };
    const applyFilter=()=>{
        let d1=from["$D"],m1=from["$M"]+1,y1=from["$y"];
        let d2=to["$D"],m2=to["$M"]+1,y2=to["$y"];
        if(m1<10){
            m1="0"+m1
        }
        if(m2<10){
            m2="0"+m2
        }
        console.log(`https://newsapi.org/v2/everything?from=${y1}-${m1}-${d1}&to=${y2}-${m2}-${d2}&sortBy=popularity&`)
        axios.get(`https://newsapi.org/v2/everything?from=${y1}-${m1}-${d1}&to=${y2}-${m2}-${d2}&sortBy=popularity&apiKey=103a1879ea8a49aa924f080c8d82cc58`).
    then(res=>{setMarqueeData(res.data.articles?.filter(article=>article.source.name===source));console.log('res.data', res.data.articles)})
    }
    const clearFilter=()=>{
        setFrom(dayjs('2014-08-18T21:11:54'))
        setTo(dayjs('2014-08-18T21:11:54'))
        setSource("Times of India")
        setSortBy("Popularity")
        axios.get("https://newsapi.org/v2/top-headlines?language=en&category=general&apiKey=103a1879ea8a49aa924f080c8d82cc58").
    then(res=>{setMarqueeData(res.data.articles);console.log('res.data', res.data.articles)})
    }
    console.log('source,from,to', source,from,to["$y"])

    return (
        <div>
            <Modal
                open={filter}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography variant='div' onClick={()=>{setFilter(false)}} style={{display:"flex",flexDirection:"row-reverse"}} className='cursor-pointer text-xl font-bold'>&times;</Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Filters
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <DesktopDatePicker
                                        label="From"
                                        inputFormat="MM/DD/YYYY"
                                        value={from}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField sx={{ width: "45%" }} {...params} />}
                                    />
                                    <DesktopDatePicker
                                        label="To"
                                        inputFormat="MM/DD/YYYY"
                                        value={to}
                                        onChange={handleChange2}
                                        renderInput={(params) => <TextField sx={{ width: "45%" }} {...params} />}
                                    />
                                </div>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={source}
                                            label="Source"
                                            onChange={(e) => { setSource(e.target.value)}}
                                        >
                                            <MenuItem value="Times of India">Times of India</MenuItem>
                                            <MenuItem value="NDTV India">NDTV India</MenuItem>
                                            <MenuItem value="Hindustan Times">Hindustan Times</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={sortBy}
                                            label="Sort by"
                                            onChange={(e) => {setSortBy(e.target.value) }}
                                        >
                                            <MenuItem value="Popularity">Popularity</MenuItem>
                                            <MenuItem value="Time">Time</MenuItem>
                                            <MenuItem value="Relevance">Relevance</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Stack spacing={2} direction="row">
                                    <Button onClick={applyFilter} variant="contained">Apply</Button>
                                    <Button onClick={clearFilter} variant="outlined">Clear</Button>
                                </Stack>
                            </Stack>
                        </LocalizationProvider>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}