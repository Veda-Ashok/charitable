import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import Link from './Link'
import CloseIcon from '@material-ui/icons/Close'
import { DialogContent } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}))

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
          Warning!
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            This feature is only for email-verified users, come back after you have made your
            account and verified your email :)
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} component={Link} naked href="/api/login" color="primary">
            Sign up
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}

UsersOnlyDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
