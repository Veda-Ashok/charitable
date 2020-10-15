import React from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
}))

export default function ProfilePage({ user }) {
  const classes = useStyles()
  const name = 'BJ Johnson'
  const bio =
    'I love to volunteer at the food bank and please join me in volunteering if you would like and also add me as a friend.'
  const friendCount = 100
  const location = 'Los Angeles, CA'
  const isMe = false
  const isFriend = false
  const icon = '/media/BJIcon.jpg'
  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={user} />
      <ProfileBanner
        bio={bio}
        name={name}
        friendCount={friendCount}
        location={location}
        isMe={isMe}
        icon={icon}
        isFriend={isFriend}
      />
    </div>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object,
}
