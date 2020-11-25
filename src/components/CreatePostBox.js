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
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import InfoSmallBox from './InfoSmallBox'
import axios from 'axios'

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

export default function CreatePostBox({
  defaultText,
  closePostDialog,
  result,
  type,
  dbuser,
  name,
  icon,
  handleSuccessOpen,
}) {
  const [input, setInput] = useState(defaultText)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === '' || input === undefined || input === null) {
      handleOpen()
    } else {
      setInput('')

      const createPost = async () => {
        try {
          console.log('result', result)
          console.log('type', type)
          console.log('dbuser', dbuser)
          const organization_id =
            type === 'trending'
              ? result.organization.id.toString()
              : type === 'organizations'
              ? result.gg_id
              : undefined
          const activity_id = type === 'activities' ? result._id : undefined
          let response = await axios.post('/api/createPost', {
            poster: dbuser._id,
            image: undefined,
            organization_id: organization_id,
            activity_id: activity_id,
            typed_content: input,
          })
          //whatever it shows for a successful insert check for that
          if (response.data.matchedCount === 1 && response.data.modifiedCount === 1) {
            handleSuccessOpen()
          }
        } catch (error) {
          console.error(error)
        }
      }
      createPost()
      //send the post data to the post api
      if (result && type) {
        closePostDialog()
      }
    }
  }

  console.log('dbuser? ', dbuser)

  return (
    <Paper className={classes.root} variant="outlined">
      {result && type ? (
        <>
          <div className={classes.flex}>
            <Avatar
              className={classes.avatar}
              alt={dbuser.name}
              src={dbuser.profile_picture}></Avatar>
            <InfoSmallBox dbuser={dbuser} result={result} type={type} showPopup={false} />
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
            <Avatar alt={name} src={icon}></Avatar>
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
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <div className={classes.root}>
          <DialogTitle>
            <Typography> Please type something to share :) </Typography>
          </DialogTitle>
        </div>
      </Dialog>
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
  closePostDialog: PropTypes.func,
  handleSuccessOpen: PropTypes.func,
}
