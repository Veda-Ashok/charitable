import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import auth0 from '../../utils/auth0'

export default function Profile({ user }) {
  useEffect(() => {
    if (!user) {
      window.location.href = '/api/login'
    } else {
      window.location.href = `/profile/${user.nickname}`
    }
  }, [user])

  return (
    <div>
      <h1>This page does not exist, redirecting you to a new page ~ </h1>
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
