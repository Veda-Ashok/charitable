import React from 'react'
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import EventNoteIcon from '@material-ui/icons/EventNote'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    color: grey,
    flexDirection: 'column',
    maxWidth: '50rem',
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
  button: {
    borderRadius: '999px',
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
            placeholder={'Share with the community!'}
          />
        </form>
        <Fab variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
          Post
        </Fab>
      </div>
      <div className={classes.bottom}>
        <label htmlFor="upload-photo">
          <input
            name="upload-photo"
            id="upload-photo"
            accept="image/*"
            style={{ display: 'none' }}
            type="file"
          />
          <Button className={classes.attachOption} component="div">
            <PhotoLibraryIcon />
            <Typography variant="subtitle">Attach Image</Typography>
          </Button>
        </label>
        <Button className={classes.attachOption} component="div">
          <LocationCityIcon />
          <Typography variant="subtitle">Attach Organization</Typography>
        </Button>
        <Button className={classes.attachOption}>
          <EventNoteIcon />
          <Typography variant="subtitle">Attach Activity</Typography>
        </Button>
      </div>
    </Paper>
  )
}

CreatePostBox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
}
