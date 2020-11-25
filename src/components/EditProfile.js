import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import ProfileBannerAvatar from './ProfileBannerAvatar'
import Badge from '@material-ui/core/Badge'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
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
  upload: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  banner: {
    marginTop: theme.spacing(6.5),
  },
}))

export default function EditProfile(props) {
  const classes = useStyles()
  const { onClose, open, userInfo } = props
  const [updatedInfo, setUpdatedInfo] = useState({})

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(`/api/editProfile/${userInfo.nickname}`, {
        updatedInfo: updatedInfo,
      })
      props.setRefresh(!props.refresh)
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
          <div className={classes.upload}>
            <div>
              <Typography className={classes.iconText} variant="body">
                Upload Icon
              </Typography>
              <IconButton className={classes.icon}>
                <label htmlFor="upload-photo">
                  <input
                    name="upload-photo"
                    id="upload-photo"
                    accept="image/*"
                    style={{ display: 'none' }}
                    type="file"
                  />
                  <Badge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    badgeContent={<AddCircleIcon />}>
                    <ProfileBannerAvatar icon={userInfo.icon} />
                  </Badge>
                </label>
              </IconButton>
            </div>
            <div className={classes.banner}>
              <label htmlFor="upload-photo">
                <input
                  name="upload-photo"
                  id="upload-photo"
                  accept="image/*"
                  style={{ display: 'none' }}
                  type="file"
                />
                <Fab variant="extended" className={classes.attachOption} component="div">
                  <PhotoLibraryIcon />
                  <Typography variant="subtitle2">Upload Banner Photo</Typography>
                </Fab>
              </label>
            </div>
          </div>
          <TextField
            id="standard-basic"
            label="Edit Name"
            defaultValue={userInfo.name}
            className={classes.text}
            onChange={handleChange('name')}
            inputProps={{
              maxLength: 75,
            }}
          />
          <TextField
            id="standard-basic"
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
