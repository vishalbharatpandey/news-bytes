import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom';
import './../styles/MoreOptions.css'

export default function MoreOptionsDialog({ open, setOpen, articleToSave, articleToDelete, dialogPosition,savedArticles,setSavedArticles,setHeadlines }) {

    const [coordinates, setCoordinates] = React.useState({ 'x': dialogPosition.x - 50, 'y': dialogPosition.y - 160 })
    const location = useLocation()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const OpenArticle = () => {
        window.open(articleToSave?.url, '_blank')
    }
    const saveArticle = () => {
        let articles = JSON.parse(localStorage.getItem("SavedArticles"))
        articles.push(articleToSave)
        localStorage.setItem("SavedArticles", JSON.stringify(articles))
    }
    const deleteArticle = () => {
        console.log('articleToDelete', articleToDelete)
        let articles = JSON.parse(localStorage.getItem("SavedArticles"))
        if (articleToDelete !== null) {
            articles = articles.filter(article => article.title !== articleToDelete.title)
            localStorage.setItem("SavedArticles", JSON.stringify(articles))
            setSavedArticles(articles)
            articleToDelete = null
        }
    }

    return (
        <div className='dialog' style={{ marginLeft: coordinates.x, marginTop: coordinates.y }}>
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                {location.pathname.slice(1) !== "savedArticles" &&
                    <Button sx={{ width: '100%' }} onClick={() => { saveArticle(); handleClose() }} autoFocus>
                        Save
                    </Button>
                }
                {location.pathname.slice(1) === "savedArticles" &&
                    <Button sx={{ width: '100%' }} onClick={() => { deleteArticle(); handleClose() }} autoFocus>
                        Unsave
                    </Button>
                }
                <Button sx={{ width: '100%' }} onClick={() => { OpenArticle(); handleClose() }}>
                    Open
                </Button>
                
            </div>
            {/* </Dialog> */}
        </div>
    );
}