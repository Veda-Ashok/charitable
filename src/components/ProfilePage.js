import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import SavedOrgsScrollview from './SavedOrgsScrollview'
import { searchFeatured } from '../apicalls/globalGivingApi'
import PostScrollview from './PostScrollview'
import { mockPosts } from '../tests/MockAPI/MockPosts'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
  postBox: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  post: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  content: {
    display: 'flex',
  },
  savedOrg: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}))

export default function ProfilePage(props) {
  const [isLoading, setIsLoading] = useState(false)
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
        <PostScrollview posts={mockPosts.posts}></PostScrollview>
        <div className={classes.savedOrg}>
          <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null}></SavedOrgsScrollview>
        </div>
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null}></SavedOrgsScrollview>
      )}
    </div>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFriend: PropTypes.bool,
  orgs: PropTypes.object,
}
