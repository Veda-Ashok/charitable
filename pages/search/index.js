import React from 'react'
import NavBar from '../../src/components/Navbar'
import Typography from '@material-ui/core/Typography'

export default function Search() {
  return (
    <div className="container">
      <div>
        <NavBar page="Search" />
        <Typography variant="h1">Search</Typography>
      </div>
    </div>
  )
}
