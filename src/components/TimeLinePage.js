import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import PostScrollview from '../../src/components/PostScrollview'
import { mockPosts } from '../../src/tests/MockAPI/MockPosts'
import CreatePostBox from '../../src/components/CreatePostBox'
import Loading from './Loading'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
// import { connectToDatabase } from '../../utils/mongodb'
// import { searchUsers } from '../apicalls/mongoApi'

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

export default function TimelinePage({ user }) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(undefined)
  const [charitUser, setCharitUser] = useState(undefined)

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
        await axios
          .get(`/api/searchUsers/ekejfj`)
          .then((response) => {
            console.log('response', response.data)
            setCharitUser(response.data[0])
          })
          .catch((error) => {
            console.log(error)
          })
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
      <h3>{charitUser.email_verified ? 'true' : 'false'}</h3>
      <Paper className={classes.organizations}>
        <div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Typography>{error}</Typography>
          ) : charitUser ? (
            <div className={classes.content}>
              <div>
                <CreatePostBox name="Bj" icon="/media/BjIcon" />
                <PostScrollview posts={mockPosts.posts} className={classes.posts}></PostScrollview>
              </div>
            </div>
          ) : (
            <div>verify your email to access this page</div>
          )}
        </div>
      </Paper>
    </div>
  )
}

TimelinePage.propTypes = {
  user: PropTypes.object,
}
