import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import OrgDialog from './OrgDialog'
import TrendingListItems from './TrendingListItems'

export default function SavedOrgsScrollview({ orgs }) {
  if (orgs) {
    const [org, setOrg] = useState(orgs[0])
    const [open, setOpen] = useState(false)

    const handleClickOpen = (org) => {
      setOrg(org)
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    let orgSet = new Set()
    const listItems = orgs
      .filter((org) => {
        let exists = orgSet.has(org.organization.id)
        orgSet.add(org.organization.id)
        return !exists
      })
      .map((org) => (
        <ListItem key={org.organization.name}>
          <TrendingListItems onClick={() => handleClickOpen(org)} orgDetails={org} saved={false} />
        </ListItem>
      ))

    return (
      <div>
        <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <List>{listItems}</List>
          <OrgDialog org={org} open={open} onClose={handleClose} />
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
