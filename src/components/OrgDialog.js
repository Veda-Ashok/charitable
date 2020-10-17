import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DescriptionBox from './DescriptionBox'
import Button from '@material-ui/core/Button'

export default function OrgDialog(props) {
  //   const classes = useStyles()
  const { onClose, open, org } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <Button onClick={handleClose}>X</Button>
      <DescriptionBox orgDetails={org}></DescriptionBox>
    </Dialog>
  )
}

OrgDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  org: PropTypes.object,
}
