import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './../styles/Headlines.css'
import { AiOutlineMore } from "react-icons/ai"
import Loader from './Loader'
import MoreOptionsDialog from './MoreOptions'

const Headlines = ({ url }) => {

    const [headlines, setHeadlines] = useState(null)
    const [loader, setLoader] = useState(false)
    const [moreOptions, setMoreOptions] = useState(false)
    const [articleToSave, setArticleToSave] = useState(null)
    const [dialogPosition, setDialogPosition] = useState({ 'x': 0, 'y': 0 })
    const [savedArticles, setSavedArticles] = useState(() => {
        if (!localStorage.getItem("SavedArticles")) {
            localStorage.setItem("SavedArticles", JSON.stringify([]))
        }
    })

    useEffect(() => {
        setLoader(true)
        axios.get(url)
            .then(res => {
                setHeadlines(res.data.articles);
                console.log('res', res)
            })
        setTimeout(() => { setLoader(false) }, 2000)
    }, [url])

    const openDialog = (event, newsArticle) => {
        event.preventDefault()
        setDialogPosition({ 'x': event.pageX, 'y': event.pageY })
        setArticleToSave(newsArticle)
        setMoreOptions(!moreOptions)
    }

    return (
        <>
            <Loader loading={loader} />
            {moreOptions && <MoreOptionsDialog open={moreOptions} setOpen={setMoreOptions} dialogPosition={dialogPosition} articleToSave={articleToSave} setHeadlines={setHeadlines} />}
            <div id='headlines' className="headlines">
                <div className='block'>
                    {
                        headlines?.map((item, index) => {
                            return <div className="element">
                                <a target="_blank" href={item.url}><li className='titles'>
                                    <div>
                                        {item.urlToImage ?
                                            <img src={item.urlToImage} /> :
                                            <img src="/NewsByte.png" alt='NEWSBYTE' />
                                        }
                                    </div>
                                    <div className='title'>
                                        <span>{item.title}</span>
                                        <span onClick={(e) => { openDialog(e, item) }} className='text-2xl cursor-pointer' style={{ marginTop: "7px" }}><AiOutlineMore /></span>
                                    </div>
                                </li></a>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Headlines