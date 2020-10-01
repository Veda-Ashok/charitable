import NavigationBar from '../src/components/NavigationBar'
import Scrollview from '../src/components/Scrollview'
import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

export default function Trending({ user }) {
  let orgs = [
    { name: 'unicef', mission: 'have fun', category: '4' },
    { name: 'red cross', mission: 'git gud', category: '2' },
    { name: 'ukoweokewkocef', mission: 'havun', category: '1' },
    { name: "Sam Gibson's College Tuition Fund", mission: 'give sam money', category: '69420' },
    { name: "Rachel's College Tuition Fund", mission: 'give rachel money', category: '0' },
  ]

  return (
    <div className="container">
      <main>
        <nav>
          <NavigationBar user={user} page="Trending" />
        </nav>
        <div>
          <Typography variant="h1">Trending</Typography>
        </div>
        <div>
          <Scrollview orgs={orgs}></Scrollview>
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
