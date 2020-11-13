import { makeStyles } from '@material-ui/core/styles'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'
import TimelinePage from '../../src/components/TimeLinePage'
import { connectToDatabase } from '../../utils/mongodb'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(11),
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function Timeline({ user }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TimelinePage user={user} />
      {/* {charit_user[0].name} */}
    </div>
  )
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  // const { db } = await connectToDatabase()
  // const users = await db.collection('users').find({}).limit(1).toArray()
  return {
    props: {
      user: session?.user || null,
      // charit_user: JSON.parse(JSON.stringify(users)),
    },
  }
}

Timeline.propTypes = {
  user: PropTypes.object,
  // charit_user: PropTypes.object,
}
