import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ProfileBannerAvatar from './ProfileBannerAvatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import EditIcon from '@material-ui/icons/Edit'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PropTypes from 'prop-types'

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
  friendText: {
    paddingRight: theme.spacing(1),
  },
  bioText: {
    marginRight: theme.spacing(2),
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

  return (
    <div className={classes.grow}>
      <Card>
        <CardMedia className={classes.media} image="/media/banner.png" title="profileBanner">
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
              <Button size="small" variant="contained" className={classes.button} color="primary">
                <EditIcon fontSize="small" className={classes.editIcon} />
                Edit Profile
              </Button>
            ) : (
              <Button size="small" variant="contained" className={classes.button} color="primary">
                <PersonAddIcon fontSize="small" className={classes.editIcon} />
                Add Friend
              </Button>
            )}
          </div>
          <CardContent className={classes.content}>
            <PeopleAltIcon fontSize="small" />
            <Typography variant="body2" className={classes.friendText}>
              {props.friendCount} Friends
            </Typography>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{props.location}</Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

ProfileBanner.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  friendCount: PropTypes.number,
  bio: PropTypes.string,
  location: PropTypes.location,
  isMe: PropTypes.boolean,
}
