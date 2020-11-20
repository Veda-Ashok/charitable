import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
})

export default function SavedDialog(props) {
  const classes = useStyles()
  const { onClose, open, isSaved, name } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={classes.root}>
        <DialogTitle>
          {isSaved ? (
            <Typography> Congratulations! You have saved {name} </Typography>
          ) : (
            <Typography> You have unsaved {name}.</Typography>
          )}
        </DialogTitle>
      </div>
    </Dialog>
  )
}

SavedDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
}
