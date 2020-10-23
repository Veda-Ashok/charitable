import React from 'react'
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

  const handleClose = () => {
    onClose()
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
          />
          <TextField
            id="standard-basic"
            label="Edit Bio"
            defaultValue={userInfo.bio}
            multiline
            rows={4}
            rowsMax={10}
            className={classes.text}
          />
          <Fab variant="extended" color="primary">
            Save
          </Fab>
        </div>
      </Dialog>
    </Paper>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
}
