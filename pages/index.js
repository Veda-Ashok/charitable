import NavigationBar from '../src/components/NavigationBar'
import Scrollview from '../src/components/Scrollview'
import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { searchFeatured } from '../src/api/globalGivingApi'
import TalkToFlask from '../src/components/TalkToFlask'

export default function Trending({ user, orgs }) {
  // let orgs = [
  //   // { name: 'unicef', mission: 'have fun', category: '4' },
  //   // { name: 'red cross', mission: 'git gud', category: '2' },
  //   // { name: 'ukoweokewkocef', mission: 'havun', category: '1' },
  //   // { name: "Sam Gibson's College Tuition Fund", mission: 'give sam money', category: '69420' },
  //   // { name: "Rachel's College Tuition Fund", mission: 'give rachel money', category: '0' },
  // ]

  // const [orgs, setOrgs] = useState()

  // useEffect(() => {, [])

  return (
    <div className="container">
      <main>
        <nav>
          {console.log(user)}
          <NavigationBar user={user} page="Trending" />
        </nav>
        <div>
          <Typography variant="h1">Trending</Typography>
          <TalkToFlask />
        </div>
        <div>
          <Scrollview orgs={orgs ? orgs.projects.project : null}></Scrollview>
        </div>
      </main>
    </div>
  )
}

// export async function getServerSideProps({ req }) {
//   // pass the request that comes on the context object into auth0
//   const session = await auth0.getSession(req)
//   let tempOrgs = []

//   await fetch(
//     'https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=e9d51f98-4e9f-4dcb-8df9-45f2ae9abff9',
//     {
//       headers: {
//         Accept: 'application/JSON',
//       },
//     }
//   )
//     .then((res) => res.json())
//     .then((res) => {
//       console.log('res: ', res)
//       for (const project of res.projects.project) {
//         console.log('project: ', project)
//         tempOrgs.push(project)
//       }
//     })
//     .catch((e) => console.log(e))

//   return {
//     props: {
//       user: session?.user || null,
//       orgs: tempOrgs,
//     },
//   }
// }

// Trending.propTypes = {
//   user: PropTypes.object,
//   orgs: PropTypes.array,
// }

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  let tempOrgs
  await searchFeatured('featured/projects')
    .then((result) => {
      tempOrgs = result
    })
    .catch((e) => console.log(e))

  console.log(tempOrgs)
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
