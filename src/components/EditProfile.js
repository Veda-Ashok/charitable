import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ProfileBannerAvatar from './ProfileBannerAvatar'
import Badge from '@material-ui/core/Badge'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'

export default function EditProfile(props) {
  const { onClose, open, userInfo } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Paper>
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Button onClick={handleClose}>X</Button>
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
        <TextField id="standard-basic" label="Edit Name" placeholder={userInfo.name}></TextField>
        <TextField id="standard-basic" label="Edit Bio" placeholder={userInfo.bio}></TextField>
        <TextField
          id="standard-basic"
          label="Edit Location"
          placeholder={userInfo.location}></TextField>
        <Fab variant="extended" color="primary">
          Save
        </Fab>
      </Dialog>
    </Paper>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
}
