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
  charitUser,
  name,
  icon,
  handleSuccessOpen,
  getPosts,
}) {
  const [input, setInput] = useState(defaultText)
  const [photo, setPhoto] = useState(null)
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0])
    console.log(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === '' || input === undefined || input === null) {
      handleOpen()
    } else {
      setInput('')
      const createPost = async () => {
        try {
          const organization_id =
            type === 'trending'
              ? result.organization.id.toString()
              : type === 'organizations'
              ? result.gg_id
              : null
          const activity_id = type === 'activities' ? result._id : null
          const formData = new FormData()
          formData.append('poster', charitUser.nickname)
          formData.append('image', photo)
          formData.append('organization_id', organization_id)
          formData.append('activity_id', activity_id)
          formData.append('typed_content', input)
          const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          }
          let response = await axios.post('/api/createPost', formData, config)
          //whatever it shows for a successful insert check for that
          if (response.data.insertedCount === 1) {
            handleSuccessOpen()
            if (getPosts) {
              getPosts()
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
      createPost()
      setPhoto(null)
      //send the post data to the post api
      if (result && type) {
        closePostDialog()
      }
    }
  }

  return (
    <Paper className={classes.root} variant="outlined">
      {result && type ? (
        <>
          <div className={classes.flex}>
            <Avatar
              className={classes.avatar}
              alt={charitUser.name}
              src={charitUser.profile_picture}></Avatar>
            <InfoSmallBox charitUser={charitUser} result={result} type={type} showPopup={false} />
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
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                type="file"
                onChange={(e) => handlePhoto(e)}
              />
              <Button className={classes.attachOption} component="div">
                <PhotoLibraryIcon />
                <Typography variant="subtitle2">
                  {photo ? `${photo.name} Attached!` : 'Attach Image'}
                </Typography>
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
  charitUser: PropTypes.object,
  closePostDialog: PropTypes.func,
  handleSuccessOpen: PropTypes.func,
  getPosts: PropTypes.any,
}
