import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CreatePostBox from './CreatePostBox'
import InfoSmallBox from './InfoSmallBox'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default function PostDialog(props) {
  const classes = useStyles()
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div className={classes.root}>
        <DialogActions>
          <IconButton onClick={handleClose} aria-label="Close" size="small">
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent>
          <InfoSmallBox orgDetails={props.org} />
          <CreatePostBox name="Bj Johnson" icon="/media/BjIcon" defaultText={props.org.name} />
        </DialogContent>
      </div>
    </Dialog>
  )
}

PostDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  org: PropTypes.object,
}
