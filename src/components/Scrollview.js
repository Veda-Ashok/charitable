import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import DescriptionBox from './DescriptionBox'
import Button from '@material-ui/core/Button'

export default function ScrollView({ orgs }) {
  // wait sam would we not put the onclick in the button
  // we make the function then put the function in the button Element wait i think maybe we can do something like
  // wait i kinda forgot how t o do it lol ok let's try this
  const [org, setOrg] = useState(orgs[0])
  // yea im thinking someting like that but idk how, im not good with hooks
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   setOrg({ name: 'Unicef', mission: 'wraewrwF', category: 'wgqergqergr' })
  // }, [])

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
}

ScrollView.propTypes = {
  orgs: PropTypes.array,
}
