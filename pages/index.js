import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import TrendingPage from '../src/components/TrendingPage'
import { connectToDatabase } from '../utils/mongodb'

export default function Trending({ user, charit_user }) {
  return (
    <div>
      <h1>{charit_user[0].name}</h1>
      <TrendingPage user={user} />
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const session = await auth0.getSession(req)
  const { db } = await connectToDatabase()
  const users = await db.collection('users').find({}).limit(1).toArray()

  return {
    props: {
      user: session?.user || null,
      charit_user: JSON.parse(JSON.stringify(users)),
    },
  }
}

Trending.propTypes = {
  user: PropTypes.object,
  charit_user: PropTypes.array,
}
