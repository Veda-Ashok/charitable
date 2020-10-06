import NavigationBar from '../src/components/NavigationBar'
import DescriptionBox from '../src/components/DescriptionBox'
import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import TalkToFlask from '../src/components/TalkToFlask'

export default function Trending({ user }) {
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
          <DescriptionBox />
        </div>
      </main>
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

Trending.propTypes = {
  user: PropTypes.object,
}
