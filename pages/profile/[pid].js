import React from 'react'
import ProfilePage from '../../src/components/ProfilePage'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import auth0 from '../../utils/auth0'
import { connectToDatabase } from '../../utils/mongodb'

export default function Profile({ user, charit_user }) {
  const router = useRouter()
  const { pid } = router.query
  console.log(charit_user)

  //Need to do the query to see if the pid is in the users Follow

  return (
    <div>
      <ProfilePage
        member={pid}
        user={user}
        isMe={user ? pid === user.sub : false}
        isFollower={false}
        charit_user={charit_user}
      />
      {charit_user[0].name}
    </div>
  )
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  const { db } = await connectToDatabase()

  const users = await db.collection('users').find({}).limit(1).toArray()

  return {
    props: {
      user: session?.user || null,
      charit_user: JSON.parse(JSON.stringify(users))[0],
    },
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  charit_user: PropTypes.object,
}
