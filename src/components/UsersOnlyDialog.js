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

export default function UsersOnlyDialog(props) {
  const classes = useStyles()
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={classes.root}>
        <DialogTitle>
          <Typography>
            {' '}
            This feature is only for email-verified users, come back after you have made your
            account and verified your email :){' '}
          </Typography>
        </DialogTitle>
      </div>
    </Dialog>
  )
}

UsersOnlyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
