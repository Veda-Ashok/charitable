import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import InfoSmallBox from './InfoSmallBox'
import Link from './Link'
import CardActionArea from '@material-ui/core/CardActionArea'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  top: {
    display: 'flex',
    borderBottom: '1px solid #eff2f5',
    padding: '1rem',
  },
  topForm: {
    flex: 1,
    display: 'flex',
  },
  topText: {
    padding: '0rem 1rem',
    margin: '0 .5rem',
  },
  bottom: {
    padding: '1rem',
  },
})

export default function PostBox({
  name,
  isProfile,
  nickname,
  icon,
  time,
  typedContent,
  image,
  orgDetails,
  activityDetails,
  viewer,
  refresh,
  setRefresh,
}) {
  const classes = useStyles()

  let header = (
    <div className={classes.top}>
      <Avatar alt={name} src={icon}></Avatar>
      <div className={classes.topText}>
        <Typography variant="body1">{name}</Typography>
        <Typography color="textSecondary" variant="caption">
          {time}
        </Typography>
      </div>
    </div>
  )

  return (
    <Card className={classes.root}>
      {isProfile ? (
        <CardActionArea>{header}</CardActionArea>
      ) : (
        <CardActionArea href={`/profile/${nickname}`} as={Link}>
          {header}
        </CardActionArea>
      )}
      <div className={classes.bottom}>
        <Typography variant="body1">{typedContent}</Typography>
      </div>
      {image && <img alt="postPhoto" src={image} />}
      {orgDetails && (
        <InfoSmallBox
          result={orgDetails}
          type="organizations"
          showPopup
          charitUser={viewer}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {activityDetails && (
        <InfoSmallBox
          result={activityDetails}
          refresh={refresh}
          setRefresh={setRefresh}
          type="activities"
          showPopup
          charitUser={viewer}
        />
      )}
    </Card>
  )
}

PostBox.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  time: PropTypes.string,
  typedContent: PropTypes.string,
  image: PropTypes.string,
  orgDetails: PropTypes.object,
  activityDetails: PropTypes.object,
  viewer: PropTypes.object,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  isProfile: PropTypes.bool,
}
