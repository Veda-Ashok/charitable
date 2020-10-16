import React from 'react'
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import EventNoteIcon from '@material-ui/icons/EventNote'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    color: grey,
    flexDirection: 'column',
    maxWidth: '30rem',
  },
  top: {
    display: 'flex',
    borderBottom: '1px solid #eff2f5',
    padding: '1rem',
  },
  topForm: {
    flex: 1,
    display: 'flex',
  },
  topInput: {
    flex: 1,
    outlineWidth: 0,
    border: 'none',
    padding: '.5rem 1rem',
    margin: '0 .5rem',
    borderRadius: '999px',
    backgroundColor: '#eff2f5',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  attachOption: {
    paddingRight: '1rem',
    paddingLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
    color: grey,
    margin: '.2rem',
    textTransform: 'none',
    fontSize: '.7rem',
  },
})

export default function CreatePostBox(props) {
  const [input, setInput] = useState('')
  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()

    setInput('')
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <Avatar alt={props.name} src={props.icon}></Avatar>
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
        <Button className={classes.attachOption}>
          <PhotoLibraryIcon />
          <Typography variant="subtitle">Attach Image</Typography>
        </Button>
        <label htmlFor="upload-photo">
          <input
            name="upload-photo"
            id="upload-photo"
            accept="image/*"
            style={{ display: 'none' }}
            type="file"
          />
          {/* <Button className={classes.attachOption}> */}
          <AttachFileIcon />
          <Typography variant="subtitle">Attach File</Typography>
          {/* </Button> */}
        </label>
        <Button className={classes.attachOption}>
          <EventNoteIcon />
          <Typography variant="subtitle">Include Organization/Event</Typography>
        </Button>
      </div>
    </Paper>
  )
}

CreatePostBox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
}
