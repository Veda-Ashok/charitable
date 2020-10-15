import React from 'react'
import ProfilePage from '../../src/components/ProfilePage'
import PropTypes from 'prop-types'
import auth0 from '../../utils/auth0'

export default function Profile({ user }) {
  return (
    <div>
      <ProfilePage user={user} />
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
