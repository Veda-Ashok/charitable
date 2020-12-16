import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import PostScrollview from './PostScrollview'
import CreatePostBox from './CreatePostBox'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import SuccessfulPostDialog from './SuccessfulPostDialog'
import Loading from './Loading'
import axios from 'axios'
import SavedItems from './SavedItems'
import VerifyEmail from './VerifyEmail'
import CreateAccount from './CreateAccount'

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
    justifyContent: 'center',
  },
  savedOrg: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  savedOrgSmall: {
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  title: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  noPosts: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

function ProfilePage(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState(null)
  const [orgs, setOrgs] = useState(null)
  const [posts, setPosts] = useState(null)
  const [name, setName] = useState(null)
  const [bio, setBio] = useState(null)
  const [banner, setBanner] = useState(null)
  const [icon, setIcon] = useState(null)
  const [email_verified, setEmailVerified] = useState(false)
  const [success, setSuccessOpen] = useState(false)
  const [owner, setOwner] = useState(undefined)
  const [viewer, setViewer] = useState(undefined)
  const [refresh, setRefresh] = useState(false)

  const handleSuccessOpen = () => {
    setSuccessOpen(true)
  }

  const handleSuccessClose = () => {
    setSuccessOpen(false)
  }

  async function getPosts() {
    const posts = await axios.get(`/api/returnUsersPosts/${props.pid}`)
    setPosts(posts.data)
  }

  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        if (props.isMe) {
          const response = await axios.get(`/api/searchUserSavedInfo/${props.user.nickname}`)
          setOwner(response.data)
          setViewer(response.data)
          setOrgs(response.data.saved_orgs_docs)
          setActivities(response.data.saved_activities_docs)
          setIcon(response.data.profile_picture)
          setName(response.data.name)
          setBanner(response.data.banner_picture)
          setBio(response.data.bio)
          setEmailVerified(response.data.email_verified)
        } else {
          const profile = await axios.get(`/api/searchUserSavedInfo/${props.pid}`)
          const myResponse = await axios.get(`/api/searchUserByNickname/${props.user.nickname}`)
          setOwner(profile.data)
          setViewer(myResponse.data)
          setOrgs(profile.data.saved_orgs_docs)
          setActivities(profile.data.saved_activities_docs)
          setIcon(profile.data.profile_picture)
          setName(profile.data.name)
          setBanner(profile.data.banner_picture)
          setBio(profile.data.bio)
          setEmailVerified(myResponse.data.email_verified)
        }
        getPosts()
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
  }, [refresh, props.isMe])

  const classes = useStyles()

  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      {props.user ? (
        owner && viewer ? (
          email_verified ? (
            <div>
              {console.log(owner, viewer, props.isMe)}
              <ProfileBanner
                bio={bio}
                name={name}
                nickname={owner.nickname}
                banner={banner}
                isMe={props.isMe}
                icon={icon}
                isFollower={viewer.following.includes(props.pid)}
                setRefresh={setRefresh}
                refresh={refresh}
                viewer={viewer}
                owner={owner}
              />
              <div className={classes.content}>
                <div style={{ width: '100%' }}>
                  {props.isMe ? (
                    <>
                      <CreatePostBox
                        handleSuccessOpen={handleSuccessOpen}
                        name={name}
                        icon={icon}
                        charitUser={owner}
                        getPosts={getPosts}
                      />{' '}
                      <SuccessfulPostDialog
                        open={success}
                        onClose={handleSuccessClose}
                        user={props.user}
                      />
                    </>
                  ) : null}
                  {posts ? (
                    posts.length > 0 ? (
                      <PostScrollview
                        posts={posts}
                        viewer={viewer}
                        owner={owner}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        isProfile={true}></PostScrollview>
                    ) : (
                      <Paper className={classes.noPosts}>
                        <h2>You have no posts to display</h2>
                      </Paper>
                    )
                  ) : (
                    <Loading />
                  )}
                </div>
                <div style={{ width: '100%' }}>
                  {isWidthUp('sm', props.width) && (
                    <div className={classes.savedOrg}>
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <SavedItems
                          owner={owner}
                          viewer={viewer}
                          orgs={orgs}
                          activities={activities}
                          setRefresh={setRefresh}
                          refresh={refresh}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {!isWidthUp('sm', props.width) && (
                <div className={classes.savedOrgSmall}>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <SavedItems
                      owner={owner}
                      viewer={viewer}
                      orgs={orgs}
                      activities={activities}
                      setRefresh={setRefresh}
                      refresh={refresh}
                    />
                  )}
                </div>
              )}
            </div>
          ) : (
            <VerifyEmail />
          )
        ) : (
          <Loading />
        )
      ) : (
        <CreateAccount />
      )}
    </div>
  )
}

ProfilePage.propTypes = {
  pid: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  width: PropTypes.string,
}

export default withWidth()(ProfilePage)
