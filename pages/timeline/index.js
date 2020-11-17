import React from 'react'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'
import TimelinePage from '../../src/components/TimelinePage'

export default function Timeline({ user }) {
  return <TimelinePage user={user} />
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

Timeline.propTypes = {
  user: PropTypes.object,
}
