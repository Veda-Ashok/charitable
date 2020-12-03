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
  const [posts, setPosts] = useState([])
  const [refresh, setRefresh] = useState(false)

  const handleSuccessOpen = () => {
    setSuccessOpen(true)
  }

  const handleSuccessClose = () => {
    setSuccessOpen(false)
  }

  async function getPosts() {
    const posts = await axios.get(`/api/getFriendsPosts/${user.nickname}`)
    setPosts(posts.data)
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
        const friendsPostsResponse = await axios.get(`/api/getFriendsPosts/${user.nickname}`)
        setCharitUser(response.data)

        setPosts(friendsPostsResponse.data)
        // console.log('POSTS: ', posts)
        // try ?         // rachel
        // my console saysy charit user is undefined when it logs
        // omg what if it's bc it's like the 2nd api call depends on the 1st
        // and the first might be a bit slow so everything's undefined in that moment
        // i feel like it's not always doing the api call either that or it's hella slow
        // wait i see 7 things in the data array
        // wtf, wack
        // setPosts(null)
        // wait i wanted to look at it again bc now i cant see it anymore
        // we def want to set to the data okk
        // getPosts()  hi lol hi bro i am confused bc when i use the getposts function then my posts is always null but then when i try to do setPosts inside of here it does not give a fat error but i see nothing
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
  }, [refresh])

  return (
    <div className={classes.root}>
      <NavigationBar page="Timeline" user={user} />
      {console.log('POSTS: ', posts)}
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
              getPosts={getPosts}
            />
            <SuccessfulPostDialog open={success} onClose={handleSuccessClose} user={user} />
            {posts && posts.length > 0 ? (
              <PostScrollview
                posts={posts}
                // className={classes.posts}
                refresh={refresh}
                setRefresh={setRefresh}
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
