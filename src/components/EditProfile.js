import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  icon: {
    display: 'block',
  },
  iconText: {
    display: 'block',
    marginLeft: theme.spacing(2.5),
  },
  form: {
    paddingRight: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    marginBottom: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  banner: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
  },
}))

export default function EditProfile(props) {
  const classes = useStyles()
  const { onClose, open, userInfo } = props
  const [icon, setIcon] = useState(userInfo.profile_picture)
  const [banner, setBanner] = useState(userInfo.banner_picture)
  const [uploadBanner, setUploadBanner] = useState({
    text: 'Upload Banner Picture',
    color: 'default',
  })
  const [uploadIcon, setUploadIcon] = useState({ text: 'Upload Profile Picture', color: 'default' })
  const [updatedInfo, setUpdatedInfo] = useState({ name: userInfo.name, bio: userInfo.bio })

  const handleClose = () => {
    onClose()
  }

  const handleIcon = (e) => {
    setIcon(e.target.files[0])
    setUploadIcon({
      text: `Uploaded ${e.target.files[0].name} as Profile Picture!`,
      color: 'secondary',
    })
  }

  const handleBanner = (e) => {
    setBanner(e.target.files[0])
    setUploadBanner({ text: `Uploaded ${e.target.files[0].name} as Banner!`, color: 'secondary' })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name', updatedInfo['name'])
      formData.append('bio', updatedInfo['bio'])
      formData.append('icon', icon)
      formData.append('banner', banner)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      await axios.post(`/api/editProfile/${userInfo.nickname}`, formData, config)
      props.setRefresh(!props.refresh)
      setUploadIcon({ text: 'Upload Icon Picture', color: 'default' })
      setUploadBanner({ text: 'Upload Banner Picture', color: 'default' })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (field) => {
    return (event) => {
      let newUpdatedInfo = JSON.parse(JSON.stringify(updatedInfo))
      newUpdatedInfo[field] = event.target.value
      setUpdatedInfo(newUpdatedInfo)
    }
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="sm"
      fullWidth>
      <DialogTitle>
        Edit Profile
        <IconButton
          className={classes.closeButton}
          onClick={handleClose}
          aria-label="Close"
          size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.banner}>
            <label htmlFor="upload-icon">
              <input
                name="upload-icon"
                id="upload-icon"
                accept="image/*"
                style={{ display: 'none' }}
                type="file"
                onChange={(e) => handleIcon(e)}
              />
              <Fab
                variant="extended"
                color={uploadIcon['color']}
                className={classes.attachOption}
                component="div">
                <AccountCircleIcon />
                <Typography variant="subtitle2">{uploadIcon['text']}</Typography>
              </Fab>
            </label>
          </div>
          <div className={classes.banner}>
            <label htmlFor="upload-banner">
              <input
                name="upload-banner"
                id="upload-banner"
                accept="image/*"
                style={{ display: 'none' }}
                type="file"
                onChange={(e) => handleBanner(e)}
              />
              <Fab
                variant="extended"
                color={uploadBanner['color']}
                className={classes.attachOption}
                component="div">
                <PhotoLibraryIcon />
                <Typography variant="subtitle2">{uploadBanner['text']}</Typography>
              </Fab>
            </label>
          </div>
          <TextField
            id="edit-name"
            label="Edit Name"
            defaultValue={userInfo.name}
            className={classes.text}
            onChange={handleChange('name')}
            inputProps={{
              maxLength: 75,
            }}
          />
          <TextField
            id="edit-bio"
            label="Edit Bio"
            defaultValue={userInfo.bio}
            multiline
            rows={4}
            rowsMax={7}
            className={classes.text}
            onChange={handleChange('bio')}
            inputProps={{
              maxLength: 250,
            }}
          />
          <Fab variant="extended" color="primary" onClick={handleClose} type="submit">
            Save
          </Fab>
        </form>
      </div>
    </Dialog>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
}
