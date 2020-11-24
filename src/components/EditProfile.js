import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import ProfileBannerAvatar from './ProfileBannerAvatar'
import Badge from '@material-ui/core/Badge'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    marginBottom: theme.spacing(3),
  },
}))

export default function EditProfile(props) {
  const classes = useStyles()
  const { onClose, open, userInfo } = props
  const [updatedInfo, setUpdatedInfo] = useState({})
  console.log(userInfo)

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
    <Paper>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogActions>
          <IconButton onClick={handleClose} aria-label="Close" size="small">
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <div className={classes.root}>
          <form onSubmit={handleSubmit}>
            <div>
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
                  {/* <Avatar src={userInfo.icon} /> */}
                  <ProfileBannerAvatar icon={userInfo.icon} />
                </Badge>
              </label>
            </div>
            <TextField
              id="standard-basic"
              label="Edit Name"
              defaultValue={userInfo.name}
              className={classes.text}
              onChange={handleChange('name')}
            />
            <TextField
              id="standard-basic"
              label="Edit Bio"
              defaultValue={userInfo.bio}
              multiline
              rows={4}
              rowsMax={10}
              className={classes.text}
              onChange={handleChange('bio')}
            />
            <Fab variant="extended" color="primary" onClick={handleClose} type="submit">
              Save
            </Fab>
          </form>
        </div>
      </Dialog>
    </Paper>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
}
