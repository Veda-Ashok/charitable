import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
//import OrgDialog from './OrgDialog'
import { makeStyles } from '@material-ui/core/styles'
import SearchListItems from './SearchListItems'
import SearchDialog from './SearchDialog'
// import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  orgs: {
    marginTop: theme.spacing(1),
    maxHeight: '80vh',
    overflow: 'auto',
    maxWidth: '50rem',
  },
}))

export default function SavedOrgsScrollview({ orgs, dbuser }) {
  const classes = useStyles()
  if (orgs.length > 0) {
    const [org, setOrg] = useState(orgs[0])
    const [open, setOpen] = useState(false)

    const handleClickOpen = (org) => {
      setOrg(org)
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const listItems = orgs.map((org) => (
      <ListItem key={org.gg_id}>
        <SearchListItems onClick={() => handleClickOpen(org)} result={org} type="organizations" />
      </ListItem>
    ))

    return (
      <div>
        <Paper className={classes.orgs}>
          <List>{listItems}</List>
          <SearchDialog
            result={org}
            open={open}
            onClose={handleClose}
            type="organizations"
            dbuser={dbuser}
          />
        </Paper>
      </div>
    )
  } else {
    return <Paper className={classes.orgs} />
  }
}

SavedOrgsScrollview.propTypes = {
  orgs: PropTypes.array,
  dbuser: PropTypes.object,
}
