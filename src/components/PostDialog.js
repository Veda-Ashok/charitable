import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import DialogContent from '@material-ui/core/DialogContent'
import CreatePostBox from './CreatePostBox'
import DialogTitle from '@material-ui/core/DialogTitle'

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

export default function PostDialog(props) {
  const classes = useStyles()
  const { onClose, open, result, type, charitUser, handleSuccessOpen, getPosts } = props
  const typeDisplay = type === 'trending' || type === 'organizations' ? 'organization' : 'activity'

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={classes.root}>
        <DialogTitle>
          Post about this {typeDisplay}!
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreatePostBox
            name="Bj Johnson"
            icon="/media/BjIcon"
            defaultText={`Look at the great ${typeDisplay} I found!`}
            result={result}
            type={type}
            charitUser={charitUser}
            closePostDialog={handleClose}
            handleSuccessOpen={handleSuccessOpen}
            getPosts={getPosts}
          />
        </DialogContent>
      </div>
    </Dialog>
  )
}

PostDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  result: PropTypes.object,
  type: PropTypes.string,
  charitUser: PropTypes.object,
  handleSuccessOpen: PropTypes.func,
  getPosts: PropTypes.any,
}
