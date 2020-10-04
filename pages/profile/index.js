import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import Typography from '@material-ui/core/Typography'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'

export default function Profile({ user }) {
  return (
    <div>
      <NavigationBar page="Profile" user={user} />
      <Typography variant="h1">Profile</Typography>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  return {
    props: {
      user: session?.user || null,
    },
  }
}

Profile.propTypes = {
  user: PropTypes.object,
}
