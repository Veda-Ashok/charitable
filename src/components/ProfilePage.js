import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import CreatePostBox from './CreatePostBox'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
  postBox: {
    marginTop: theme.spacing(1),
  },
}))

export default function ProfilePage(props) {
  const classes = useStyles()
  const name = 'BJ Johnson'
  const bio =
    'I love to volunteer at the food bank and please join me in volunteering if you would like and also add me as a friend.'
  const location = 'Los Angeles, CA'
  const icon = '/media/BJIcon.jpg'
  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      <ProfileBanner
        bio={bio}
        name={name}
        location={location}
        isMe={props.isMe}
        icon={icon}
        isFriend={props.isFriend}
      />
      <div className={classes.postBox}>
        <CreatePostBox icon={icon} name={name} />
      </div>
    </div>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFriend: PropTypes.bool,
}
