import React from 'react'
import NavBar from '../../src/components/Navbar'
import Typography from '@material-ui/core/Typography'

export default function TimelinePage() {
  return (
    <div>
      <NavBar page="Timeline" />
      <Typography variant="h1">Timeline</Typography>
    </div>
  )
}
