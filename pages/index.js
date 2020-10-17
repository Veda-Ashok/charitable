import NavigationBar from '../src/components/NavigationBar'
import TrendingScrollview from '../src/components/TrendingScrollview'
import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { searchFeatured } from '../src/api/globalGivingApi'
import TalkToFlask from '../src/components/TalkToFlask'

export default function Trending({ user, orgs }) {
  return (
    <div className="container">
      <main>
        <nav>
          <NavigationBar user={user} page="Trending" />
        </nav>
        <div>
          <Typography variant="h1">Trending</Typography>
          <TalkToFlask />
        </div>
        <div>
          <TrendingScrollview orgs={orgs ? orgs.projects.project : null}></TrendingScrollview>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  let tempOrgs
  await searchFeatured('featured/projects')
    .then((result) => {
      tempOrgs = result
    })
    .catch((e) => console.log(e))

  return {
    props: {
      user: session?.user || null,
      orgs: tempOrgs ? tempOrgs : null,
    },
  }
}

Trending.propTypes = {
  user: PropTypes.object,
  orgs: PropTypes.object,
}
