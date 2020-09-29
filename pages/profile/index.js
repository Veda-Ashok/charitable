import React from 'react'
import NavBar from '../../src/components/Navbar'
import Typography from '@material-ui/core/Typography'

export default function ProfilePage() {
  return (
    <div>
      <NavBar page="Profile" />
      <Typography variant="h1">Profile</Typography>
    </div>
  )
}
