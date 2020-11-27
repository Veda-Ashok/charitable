import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import PostScrollview from './PostScrollview'
import CreatePostBox from './CreatePostBox'
import Loading from './Loading'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SuccessfulPostDialog from './SuccessfulPostDialog'
import axios from 'axios'
import VerifyEmail from './VerifyEmail'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(9),
      flexGrow: 1,
    },
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function TimelinePage({ user }) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(undefined)
  const [charitUser, setCharitUser] = useState(undefined)
  const [success, setSuccessOpen] = useState(false)
  const [posts, setPosts] = useState(null)

  const handleSuccessOpen = () => {
    setSuccessOpen(true)
  }

  const handleSuccessClose = () => {
    setSuccessOpen(false)
  }

  useEffect(() => {
    // Check that a new route is OK
    if (!user) {
      window.location.href = '/api/login'
    }
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/searchUserByNickname/${user.nickname}`)
        setCharitUser(response.data)
        //TODO: somethign like this
        //setPosts(await axios.get(`api/getFollowingPosts/${props.user.nickname}`))
        setPosts(null)
        setIsLoading(false)
      } catch (error) {
        setError(error.statusText)
      } finally {
        !didCancel && setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [])

  return (
    <div className={classes.root}>
      <NavigationBar page="Timeline" user={user} />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : charitUser.email_verified ? (
        <div className={classes.content}>
          <div>
            <CreatePostBox
              handleSuccessOpen={handleSuccessOpen}
              charitUser={charitUser}
              name={charitUser.name}
              icon={charitUser.profile_picture}
            />
            <SuccessfulPostDialog open={success} onClose={handleSuccessClose} user={user} />
            {posts && posts.length > 0 ? (
              <PostScrollview
                posts={posts}
                className={classes.posts}
                viewer={charitUser}></PostScrollview>
            ) : (
              <Paper className={classes.content}>
                <h2>No Posts to Display</h2>
              </Paper>
            )}
          </div>
        </div>
      ) : (
        <VerifyEmail />
      )}
    </div>
  )
}

TimelinePage.propTypes = {
  user: PropTypes.object,
}
