import React, { useEffect } from 'react'
import ProfilePage from '../../src/components/ProfilePage'
import PropTypes from 'prop-types'
import auth0 from '../../utils/auth0'

export default function Profile({ user }) {
  useEffect(() => {
    // Check that a new route is OK
    if (!user) {
      window.location.href = '/api/login'
    }
  }, [user])

  return (
    <div>
      <ProfilePage user={user} isMe={true} isFriend={false} />
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
