import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SavedOrgsScrollview from './SavedOrgsScrollview'
import { searchFeatured } from '../apicalls/globalGivingApi'
import PostScrollview from './PostScrollview'
import { mockPosts } from '../tests/MockAPI/MockPosts'
import CreatePostBox from './CreatePostBox'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
  content: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  savedOrg: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  title: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
}))

function ProfilePage(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [orgs, setOrgs] = useState(null)

  //  FIX THIS TO BE REAL ORGS FROM OUT DATABASE
  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await searchFeatured('featured/projects')
        setOrgs(response)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        !didCancel && setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [])

  const classes = useStyles()
  const name = 'BJ Johnson'
  const bio =
    'I love to volunteer at the food bank and please join me in volunteering if you would like and also add me as a friend.'
  const icon = '/media/BJIcon.jpg'

  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      <ProfileBanner
        bio={bio}
        name={name}
        isMe={props.isMe}
        icon={icon}
        isFriend={props.isFriend}
      />
      <div className={classes.content}>
        <div>
          <CreatePostBox name="Bj Johnson" icon="/media/BjIcon" />
          <PostScrollview posts={mockPosts.posts}></PostScrollview>
          {!isWidthUp('sm', props.width) && (
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <div>
                  <Paper className={classes.title}>
                    <Typography variant="h6">Saved Organizations</Typography>
                  </Paper>
                  <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null} />
                </div>
              )}
            </div>
          )}
        </div>
        {isWidthUp('sm', props.width) && (
          <div className={classes.savedOrg}>
            <Paper className={classes.title}>
              <Typography variant="h6">Saved Organizations</Typography>
            </Paper>
            {isLoading ? (
              <Loading />
            ) : (
              <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFriend: PropTypes.bool,
  orgs: PropTypes.object,
  width: PropTypes.string,
}

export default withWidth()(ProfilePage)
