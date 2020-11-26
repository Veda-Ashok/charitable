import React from 'react'
import ProfilePage from '../../src/components/ProfilePage'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import auth0 from '../../utils/auth0'

export default function Profile({ user }) {
  const router = useRouter()
  const { pid } = router.query

  //Need to do the query to see if the pid is in the users Follow

  return (
    <div>
      <ProfilePage
        pid={pid}
        user={user}
        isMe={user ? pid === user.nickname : false}
        isFollower={false}
      />
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
