import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import InfoSmallBox from './InfoSmallBox'
import IconWithLabelPath from './IconWithLabelPath'

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

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <IconWithLabelPath
          icon={<Avatar alt={name} src={icon}></Avatar>}
          path={`/profile/${nickname}`}></IconWithLabelPath>
        <div className={classes.topText}>
          <Typography variant="body1">{name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {time}
          </Typography>
        </div>
      </div>
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
    </Paper>
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
}
