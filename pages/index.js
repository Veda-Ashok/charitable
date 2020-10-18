import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import TrendingPage from '../src/components/TrendingPage'

export default function Trending({ user }) {
  return <TrendingPage user={user} />
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  // let tempOrgs
  // await searchFeatured('featured/projects')
  //   .then((result) => {
  //     tempOrgs = result
  //   })
  //   .catch((e) => console.log(e))

  return {
    props: {
      user: session?.user || null,
      // orgs: tempOrgs ? tempOrgs : null,
    },
  }
}

Trending.propTypes = {
  user: PropTypes.object,
  // orgs: PropTypes.object,
}
