import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import Typography from '@material-ui/core/Typography'

export default function Search() {
  return (
    <div className="container">
      <div>
        <NavigationBar page="Search" />
        <Typography variant="h1">Search</Typography>
      </div>
    </div>
  )
}
