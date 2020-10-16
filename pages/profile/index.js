import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import Typography from '@material-ui/core/Typography'
import CreatePostBox from '../../src/components/CreatePostBox'

export default function ProfilePage() {
  return (
    <div>
      <NavigationBar page="Profile" />
      <Typography variant="h1">Profile</Typography>
      <CreatePostBox />
    </div>
  )
}
