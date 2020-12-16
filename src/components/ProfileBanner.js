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
import axios from 'axios'

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
    overflow: 'auto',
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

  let userId = props.viewer?._id || undefined

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

  async function handleFollow() {
    let response
    if (FollowMessage === 'Follow') {
      response = await axios.post('/api/addFollowing', {
        result: props.owner,
        userId: userId,
      })
      if (response.data.matchedCount === 1 && response.data.modifiedCount === 1) {
        setFollowMessage('Unfollow')
        setIcon(removeIcon)
        setFollowColor('secondary')
      }
    } else {
      response = await axios.post('/api/removeFollowing', {
        result: props.owner,
        userId: userId,
      })
      if (response.data.matchedCount === 1 && response.data.modifiedCount === 1) {
        setFollowMessage('Follow')
        setIcon(addIcon)
        setFollowColor('primary')
      }
    }
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
                <EditProfile
                  setRefresh={props.setRefresh}
                  refresh={props.refresh}
                  userInfo={props.viewer}
                  // banner={props.banner}
                  // icon={props.icon}
                  open={open}
                  onClose={handleClose}
                />
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
  nickname: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  bio: PropTypes.string,
  isMe: PropTypes.bool,
  isFollower: PropTypes.bool,
  banner: PropTypes.string,
  setRefresh: PropTypes.func,
  refresh: PropTypes.bool,
  viewer: PropTypes.object,
  owner: PropTypes.object,
}
