import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import Link from './Link'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
    padding: '.5rem',
  },
  leftSymbols: {
    display: 'flex',
  },
  text: {
    padding: '0rem 1rem',
    margin: '0 .5rem',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

export default function InfoSmallBox({ orgDetails, activityDetails }) {
  const details = orgDetails ? orgDetails : activityDetails
  const classes = useStyles()

  return (
    <Paper variant="outlined" className={classes.root}>
      <div className={classes.leftSymbols}>
        <Avatar className={classes.avatar} src={details.organization.logoUrl} />
        <div className={classes.text}>
          <Typography variant="body1">{details.organization.name}</Typography>
          <Typography color="textSecondary" variant="caption">
            {details.organization.themes.theme[0].name}
          </Typography>
        </div>
      </div>
      <div className={classes.button}>
        <Fab
          aria-label="visit-org"
          naked
          component={Link}
          href={details.organization.url}
          variant="extended"
          color="secondary">
          {activityDetails ? 'View Activity' : 'Visit'}
        </Fab>
      </div>
    </Paper>
  )
}

InfoSmallBox.propTypes = {
  orgDetails: PropTypes.object,
  activityDetails: PropTypes.object,
}
