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
import SuccessfulPostDialog from './SuccessfulPostDialog'
import Loading from './Loading'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(14),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
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
  const [email_verified, setEmailVerified] = useState(false)
  const [success, setSuccessOpen] = useState(false)
  const [dbuser, setDbuser] = useState(undefined)
  const [refresh, setRefresh] = useState(false)

  const handleSuccessOpen = () => {
    setSuccessOpen(true)
  }

  const handleSuccessClose = () => {
    setSuccessOpen(false)
  }

  //  FIX THIS TO BE REAL ORGS FROM OUR DATABASE
  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/searchUserByNickname/${props.user.nickname}`)
        setOrgs(response.data.saved_orgs_docs)
        setPosts(response.data.posts)
        setIcon(response.data.profile_picture)
        setName(response.data.name)
        setBanner(response.data.banner_picture)
        setBio(response.data.bio)
        setEmailVerified(response.data.email_verified)
        setDbuser(response.data)
        // console.log('email', email_verified)
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
  }, [refresh])

  const classes = useStyles()

  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      {dbuser ? (
        email_verified ? (
          <div>
            <ProfileBanner
              bio={bio}
              name={name}
              nickname={props.user.nickname}
              banner={banner}
              isMe={props.isMe}
              icon={icon}
              isFollower={props.isFollower}
              setRefresh={setRefresh}
              refresh={refresh}
            />
            <div className={classes.content}>
              <div>
                {props.isMe ? (
                  <>
                    <CreatePostBox
                      handleSuccessOpen={handleSuccessOpen}
                      name={name}
                      icon={icon}
                      dbuser={dbuser}
                    />{' '}
                    <SuccessfulPostDialog open={success} onClose={handleSuccessClose} />
                  </>
                ) : null}
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
                        <SavedOrgsScrollview dbuser={dbuser} orgs={orgs ? orgs : null} />
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
                  {isLoading ? <Loading /> : <SavedOrgsScrollview orgs={orgs ? orgs : null} />}
                </div>
              )}
            </div>
          </div>
        ) : (
          <h2>verify your email to access this page</h2>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

ProfilePage.propTypes = {
  member: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFollower: PropTypes.bool,
  width: PropTypes.string,
}

export default withWidth()(ProfilePage)
