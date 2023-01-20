import React, { useState } from 'react'
import './../styles/Headlines.css'
import { AiOutlineMore } from 'react-icons/ai'
import MoreOptionsDialog from './MoreOptions'

const SavedArticles = () => {

    const [headlines,setHeadlines]=useState(JSON.parse(localStorage.getItem("SavedArticles")))
    const [moreOptions, setMoreOptions] = useState(false)
    const [dialogPosition, setDialogPosition] = useState({ 'x': 0, 'y': 0 })
    const [articleToDelete, setArticleToDelete] = useState(null)
    const openDialog = (event, newsArticle) => {
        event.preventDefault()
        setDialogPosition({ 'x': event.pageX, 'y': event.pageY })
        setArticleToDelete(newsArticle)
        setMoreOptions(!moreOptions)
    }

  return (
    <>
    {moreOptions && <MoreOptionsDialog open={moreOptions} setOpen={setMoreOptions} dialogPosition={dialogPosition} articleToDelete={articleToDelete} savedArticles={headlines} setSavedArticles={setHeadlines} />}
            <div className="headlines">
                <div className='block'>
                    {
                        headlines?.map((item, index) => {
                            return <div className="element">
                                <a target="_blank" href={item.url}><li className='titles'>
                                    <div className='title'>
                                        <span>{item.title}</span>
                                        <span onClick={(e)=>{openDialog(e,item)}} className='text-2xl cursor-pointer' style={{marginTop:"7px"}}><AiOutlineMore /></span>
                                    </div>
                                    <div>
                                        {item.urlToImage ?
                                            <img src={item.urlToImage} /> :
                                            <img src="/NewsByte.png" alt='NEWSBYTE' />
                                        }
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

export default SavedArticles