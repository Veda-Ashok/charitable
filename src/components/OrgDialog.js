import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DescriptionBox from './DescriptionBox'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default function OrgDialog(props) {
  const classes = useStyles()
  const { onClose, open, org, dbuser } = props

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
          <DescriptionBox orgDetails={org} dbuser={dbuser}></DescriptionBox>
        </DialogContent>
      </div>
    </Dialog>
  )
}

OrgDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  org: PropTypes.object,
  dbuser: PropTypes.object,
}
