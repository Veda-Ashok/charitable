import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProfileBannerAvatar from './ProfileBannerAvatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import PropTypes from 'prop-types'
import EditProfile from './EditProfile'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: theme.spacing(14),
  },
  avatar: {
    position: 'relative',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
  },
  content: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  editIcon: {
    marginRight: theme.spacing(1),
  },
  bioText: {
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  button: {
    minWidth: '6rem',
  },
  text: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}))

export default function ProfileBanner(props) {
  const classes = useStyles()

  const removeIcon = <RemoveCircleIcon fontSize="small" className={classes.editIcon} />
  const addIcon = <PersonAddIcon fontSize="small" className={classes.editIcon} />

  const [FollowMessage, setFollowMessage] = useState(props.isFollower ? 'Unfollow' : 'Follow')
  const [FollowIcon, setIcon] = useState(props.isFollower ? removeIcon : addIcon)
  const [FollowColor, setFollowColor] = useState(props.isFollower ? 'secondary' : 'primary')

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function handleFollow() {
    if (FollowMessage === 'Follow') {
      setFollowMessage('Unfollow')
      setIcon(removeIcon)
      setFollowColor('secondary')
    } else {
      setFollowMessage('Follow')
      setIcon(addIcon)
      setFollowColor('primary')
    }
    //TODO: We are gonna need to send a request to the DB to remove and add Follow on click
  }

  return (
    <div className={classes.grow}>
      <Card>
        <CardMedia className={classes.media} image={props.banner} title="profileBanner">
          <div className={classes.avatar}>
            <ProfileBannerAvatar icon={props.icon} name={props.name} />
          </div>
        </CardMedia>
        <div className={classes.text}>
          <Typography gutterBottom variant="h6">
            {props.name}
          </Typography>
          <div className={classes.content}>
            <Typography variant="body2" className={classes.bioText}>
              {props.bio}
            </Typography>
            <div className={classes.grow}></div>
            {props.isMe ? (
              <div>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  onClick={handleClickOpen}>
                  <EditIcon fontSize="small" className={classes.editIcon} />
                  Edit Profile
                </Button>
                <EditProfile userInfo={props} open={open} onClose={handleClose} />
              </div>
            ) : (
              <Button
                onClick={handleFollow}
                size="small"
                variant="contained"
                className={classes.button}
                color={FollowColor}>
                {FollowIcon}
                {FollowMessage}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

ProfileBanner.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  bio: PropTypes.string,
  isMe: PropTypes.bool,
  isFollower: PropTypes.bool,
  banner: PropTypes.string,
}
