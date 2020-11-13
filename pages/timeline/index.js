import React, { useEffect } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import { makeStyles } from '@material-ui/core/styles'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'
import PostScrollview from '../../src/components/PostScrollview'
import { mockPosts } from '../../src/tests/MockAPI/MockPosts'
import CreatePostBox from '../../src/components/CreatePostBox'
import TalkToFlask from '../../src/components/TalkToFlask'

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

  useEffect(() => {
    // Check that a new route is OK
    if (!user) {
      window.location.href = '/api/login'
    }
  }, [user])

  return (
    <div className={classes.root}>
      <NavigationBar page="Timeline" user={user} />
      <div className={classes.content}>
        <div>
          <TalkToFlask />
          <CreatePostBox name="Bj" icon="/media/BjIcon" />
          <PostScrollview posts={mockPosts.posts} className={classes.posts}></PostScrollview>
        </div>
      </div>
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

Timeline.propTypes = {
  user: PropTypes.object,
}
