import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import TrendingPage from '../src/components/TrendingPage'

export default function Trending({ user }) {
  return <TrendingPage user={user} />
}

export async function getServerSideProps({ req }) {
  const session = await auth0.getSession(req)

  return {
    props: {
      user: session?.user || null,
    },
  }
}

Trending.propTypes = {
  user: PropTypes.object,
}
