import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import DescriptionBox from './DescriptionBox'
import Button from '@material-ui/core/Button'

export default function TrendingScrollview({ orgs }) {
  if (orgs) {
    const [org, setOrg] = useState(orgs[0])

    const listItems = orgs.map((org) => (
      <ListItem key={org.organization.name}>
        <Button onClick={() => setOrg(org)}>{org.organization.name}</Button>
      </ListItem>
    ))

    return (
      <div>
        <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
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
