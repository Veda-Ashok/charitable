import React, { useEffect } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import Typography from '@material-ui/core/Typography'
import auth0 from '../../utils/auth0'
import PropTypes from 'prop-types'
import TimelineScrollview from '../../src/components/TrendingScrollview'
import { mockPosts } from '../../src/tests/MockAPI/MockPosts'

export default function Timeline({ user }) {
  useEffect(() => {
    // Check that a new route is OK
    if (!user) {
      window.location.href = '/api/login'
    }
  }, [user])

  return (
    <div>
      <NavigationBar page="Timeline" user={user} />
      <Typography variant="h1">Timeline</Typography>
      {/* {console.log(mockPosts.posts)} */}
      <TimelineScrollview posts={mockPosts.posts}></TimelineScrollview>
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
