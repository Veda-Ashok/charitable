import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import DescriptionBox from './DescriptionBox'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1),
  },
}))

export default function TrendingScrollview({ orgs }) {
  const classes = useStyles()
  if (orgs) {
    const [org, setOrg] = useState(orgs[0])

    const listItems = orgs.map((org) => (
      <ListItem key={org.organization.name}>
        <Button onClick={() => setOrg(org)}>{org.organization.name}</Button>
      </ListItem>
    ))

    return (
      <div className={classes.root}>
        <Paper>
          <List>{listItems}</List>
        </Paper>
        <DescriptionBox orgDetails={org} />
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

TrendingScrollview.propTypes = {
  orgs: PropTypes.array,
}
