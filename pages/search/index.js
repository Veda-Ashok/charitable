import React from 'react'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'
import SearchPage from '../../src/components/SearchPage'

export default function Search({ user }) {
  return (
    <div>
      <SearchPage user={user} />
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

Search.propTypes = {
  user: PropTypes.object,
}
