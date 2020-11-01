import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SavedOrgsScrollview from './SavedOrgsScrollview'
import PostScrollview from './PostScrollview'
import CreatePostBox from './CreatePostBox'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import Loading from './Loading'
import { mockProfile } from '../tests/MockAPI/MockProfile'

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
  const [posts, setPosts] = useState()
  const [name, setName] = useState(null)
  const [bio, setBio] = useState(null)
  const [banner, setBanner] = useState(null)
  const [icon, setIcon] = useState(null)

  //  FIX THIS TO BE REAL ORGS FROM OUR DATABASE
  useEffect(() => {
    let didCancel = false
    function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        //Get user data, saved org, posts
        const response = mockProfile.result[0]
        setOrgs(response.saved_orgs)
        setPosts(response.posts.posts)
        setIcon(response.profile_picture)
        setName(response.name)
        setBanner(response.bannerPicture)
        setBio(response.bio)
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

  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      <ProfileBanner
        bio={bio}
        name={name}
        banner={banner}
        isMe={props.isMe}
        icon={icon}
        isFollower={props.isFollower}
      />
      <div className={classes.content}>
        <div>
          {props.isMe ? <CreatePostBox name="Bj Johnson" icon="/media/BjIcon" /> : null}
          <PostScrollview posts={posts}></PostScrollview>
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
  member: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFollower: PropTypes.bool,
  orgs: PropTypes.object,
  width: PropTypes.string,
}

export default withWidth()(ProfilePage)
