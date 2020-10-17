import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

export default function EditProfile(props) {
  //   const classes = useStyles()
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Button onClick={handleClose}>X</Button>
      Hello
    </Dialog>
  )
}

EditProfile.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
