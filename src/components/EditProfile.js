import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function EditProfile(props) {
  //   const classes = useStyles()
  const { onClose, open, userInfo } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Button onClick={handleClose}>X</Button>
      <TextField id="standard-basic" label="Edit Name"></TextField>
      <TextField id="standard-basic" label={userInfo.name}></TextField>
      {/* {userInfo.name} */}
      {/* <TextField id="standard-basic" label={userInfo.bio}></TextField>
      <TextField id="standard-basic" label="Edit Bio"></TextField> */}
      {/* {userInfo.bio} */}
      {/* <TextField id="standard-basic" label="Edit Name"></TextField>
      {userInfo.location} */}
    </Dialog>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
}
