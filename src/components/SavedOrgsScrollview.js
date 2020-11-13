import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import OrgDialog from './OrgDialog'
import { makeStyles } from '@material-ui/core/styles'
import TrendingListItems from './TrendingListItems'
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  orgs: {
    marginTop: theme.spacing(1),
    maxHeight: '80vh',
    overflow: 'auto',
    maxWidth: '50rem',
  },
}))

export default function SavedOrgsScrollview({ orgs }) {
  const classes = useStyles()
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
        <Paper className={classes.orgs}>
          <List>{listItems}</List>
          <OrgDialog org={org} open={open} onClose={handleClose} />
        </Paper>
      </div>
    )
  } else {
    return <Loading />
  }
}

SavedOrgsScrollview.propTypes = {
  orgs: PropTypes.array,
}
