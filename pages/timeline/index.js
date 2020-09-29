import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import Typography from '@material-ui/core/Typography'

export default function TimelinePage() {
  return (
    <div>
      <NavigationBar page="Timeline" />
      <Typography variant="h1">Timeline</Typography>
    </div>
  )
}
