import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import OrgDialog from './OrgDialog'

export default function SavedOrgsScrollview({ orgs }) {
  if (orgs) {
    // const [org, setOrg] = useState(null)
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
      //   setOrg(org)
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const listItems = orgs.map((org) => (
      <ListItem key={org.organization.name}>
        <Button onClick={handleClickOpen}>{org.organization.name}</Button>
        <OrgDialog org={org} open={open} onClose={handleClose}></OrgDialog>
      </ListItem>
    ))

    return (
      <div>
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
          <List>{listItems}</List>
        </Paper>
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

SavedOrgsScrollview.propTypes = {
  orgs: PropTypes.array,
}
