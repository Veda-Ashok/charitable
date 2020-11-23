import React from 'react'
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { grey } from '@material-ui/core/colors'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import InfoSmallBox from './InfoSmallBox'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    color: grey,
    flexDirection: 'column',
    maxWidth: '50rem',
    padding: theme.spacing(1),
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
    minWidth: '13rem',
    margin: '0 .5rem',
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
  avatar: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  flex: {
    display: 'flex',
    margin: theme.spacing(1),
  },
}))

export default function CreatePostBox(props) {
  const [input, setInput] = useState(props.defaultText)
  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()

    setInput('')
  }

  return (
    <Paper className={classes.root} variant="outlined">
      {props.result && props.type ? (
        <>
          <div className={classes.flex}>
            <Avatar className={classes.avatar} alt={props.name} src={props.icon}></Avatar>
            <InfoSmallBox
              dbuser={props.dbuser}
              result={props.result}
              type={props.type}
              showPopup={false}
            />
          </div>
          <TextField
            id="standard-multiline-flexible"
            label="Share with the community"
            multiline
            rowsMax={4}
            className={classes.topInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="filled"
          />
          <Fab variant="extended" color="primary" onClick={handleSubmit} className={classes.button}>
            Post
          </Fab>
        </>
      ) : (
        <>
          <div className={classes.top}>
            <Avatar alt={props.name} src={props.icon}></Avatar>
            <TextField
              id="standard-multiline-flexible"
              label="Share with the community"
              multiline
              rowsMax={4}
              className={classes.topInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="filled"
            />
            <Fab
              variant="extended"
              color="primary"
              onClick={handleSubmit}
              className={classes.button}>
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
                <Typography variant="subtitle2">Attach Image</Typography>
              </Button>
            </label>
          </div>
        </>
      )}
    </Paper>
  )
}

CreatePostBox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  defaultText: PropTypes.string,
  result: PropTypes.object,
  type: PropTypes.string,
  dbuser: PropTypes.object,
}
