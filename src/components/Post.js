import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import InfoSmallBox from './InfoSmallBox'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
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

export default function PostBox(props) {
  const classes = useStyles()
  console.log(props.orgDetails)

  return (
    <Paper className={classes.root}>
      <div className={classes.top}>
        <Avatar alt={props.name} src={props.icon}></Avatar>
        <div className={classes.topText}>
          <Typography variant="body1">{props.name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {props.time}
          </Typography>
        </div>
      </div>
      <div className={classes.bottom}>
        <Typography variant="body">{props.typedContent}</Typography>
      </div>
      {
        //TODO: In the future this image will be binary data sooo... we need to know what kind
        props.image && <img alt="postPhoto" src={props.image} />
      }
      {props.orgDetails && <InfoSmallBox orgDetails={props.orgDetails} />}
      {props.activityDetails && <InfoSmallBox activityDetails={props.activityDetails} />}
    </Paper>
  )
}

PostBox.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  time: PropTypes.string,
  typedContent: PropTypes.string,
  image: PropTypes.string,
  orgDetails: PropTypes.object,
  activityDetails: PropTypes.object,
}
