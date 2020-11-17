import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import PostScrollview from './PostScrollview'
import NavigationBar from './NavigationBar'
import { mockPosts } from '../tests/MockAPI/MockPosts'
import CreatePostBox from './CreatePostBox'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(15),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(11),
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
  },
}))

export default function TimelinePage({ user }) {
  const classes = useStyles()

  useEffect(() => {
    // Check that a new route is OK
    if (!user) {
      window.location.href = '/api/login'
    }
  }, [user])

  return (
    <div>
      <NavigationBar page="Timeline" user={user} />
      <div className={classes.banner}>
        <div className={classes.content}>
          <div>
            <CreatePostBox name="Bj" icon="/media/BjIcon" />
            <PostScrollview posts={mockPosts.posts} className={classes.posts}></PostScrollview>
          </div>
        </div>
      </div>
    </div>
  )
}

TimelinePage.propTypes = {
  user: PropTypes.object,
}
