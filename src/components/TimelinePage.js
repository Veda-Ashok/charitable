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
// import { connectToDatabase } from '../../utils/mongodb'
import { searchUsers } from '../apicalls/mongoApi'

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
        const response = await searchUsers('hi')
        console.log(response)

        // const { db } = await connectToDatabase()
        // const users = await db.collection('users').find({}).limit(1).toArray()
        setCharitUser(JSON.parse(JSON.stringify(response))[0])
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
      {console.log(charitUser)}
      <NavigationBar page="Timeline" user={user} />
      <Paper className={classes.organizations}>
        <div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Typography>{error}</Typography>
          ) : (
            <div className={classes.content}>
              <div>
                <CreatePostBox name="Bj" icon="/media/BjIcon" />
                <PostScrollview posts={mockPosts.posts} className={classes.posts}></PostScrollview>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </div>
  )
}

TimelinePage.propTypes = {
  user: PropTypes.object,
}
