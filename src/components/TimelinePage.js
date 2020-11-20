import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import PostScrollview from './PostScrollview'
import { mockPosts } from '../tests/MockAPI/MockPosts'
import CreatePostBox from './CreatePostBox'
import Loading from './Loading'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
// import { connectToDatabase } from '../../utils/mongodb'

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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(undefined)
  const [charitUser, setCharitUser] = useState(undefined)

  useEffect(() => {
    // Check that a new route is OK
    console.log('in use eff')
    if (!user) {
      window.location.href = '/api/login'
    }
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/searchUser/${user.nickname}`)
        // console.log(response)

        // const { db } = await connectToDatabase()
        // const users = await db.collection('users').find({}).limit(1).toArray()
        setCharitUser(response.data[0])
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
      {console.log(isLoading)}
      {console.log(charitUser)}
      <NavigationBar page="Timeline" user={user} />
      <Paper className={classes.organizations}>
        <div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Typography>{error}</Typography>
          ) : charitUser.email_verified ? (
            <div className={classes.content}>
              <div>
                <CreatePostBox name="Bj" icon="/media/BjIcon" />
                <PostScrollview posts={mockPosts.posts} className={classes.posts}></PostScrollview>
              </div>
            </div>
          ) : (
            <div>verify ur email bitch</div>
          )}
        </div>
      </Paper>
    </div>
  )
}

TimelinePage.propTypes = {
  user: PropTypes.object,
}
