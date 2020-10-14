import React from 'react'
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import EventNoteIcon from '@material-ui/icons/EventNote'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '0 30px',
    color: grey,
    backgroundColor: 'white',
    flexDirection: 'column',
    border: 15,
    maxWidth: 450,
    boxShadow: '0px 5px 7px -7px rgba(0, 0, 0, .75)',
  },
  top: {
    display: 'flex',
    borderBottom: '1px solid #eff2f5',
    padding: '15px',
  },
  topForm: {
    flex: 1,
    display: 'flex',
  },
  topInput: {
    flex: 1,
    outlineWidth: 0,
    border: 'none',
    padding: '5px 30px',
    margin: '0 10spx',
    borderRadius: '999px',
    backgroundColor: '#eff2f5',
  },
  topButton: {
    outlineWidth: 0,
    border: 'none',
    padding: '5px 30px',
    margin: '0 10px',
    borderRadius: '999px',
    backgroundColor: 'primary',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  attachOption: {
    fontSize: 10,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    color: grey,
    margin: '5px',
  },
})

export default function CreatePostBox() {
  const [input, setInput] = useState('')
  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()

    setInput('')
  }

  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Avatar>N</Avatar>
        <form className={classes.topForm}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={classes.topInput}
            placeHolder={'Share with the community!'}
          />
        </form>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Post
        </Button>
      </div>
      <div className={classes.bottom}>
        <div className={classes.attachOption}>
          <PhotoLibraryIcon />
          <h5>Attach Image</h5>
        </div>
        <div className={classes.attachOption}>
          <AttachFileIcon />
          <h5>Attach File</h5>
        </div>
        <div className={classes.attachOption}>
          <EventNoteIcon />
          <h5>Include Organization/Event</h5>
        </div>
      </div>
    </div>
  )
}
