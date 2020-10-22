import Typography from '@material-ui/core/Typography'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    top: -10,
    left: 15,
    zIndex: 1,
  },
  text: {
    marginTop: '.5rem',
  },
})

export default function Loading() {
  const classes = useStyles()
  return (
    <div className={classes.loading}>
      <Avatar src="/media/logo.svg" alt="logo" />
      <CircularProgress className={classes.circle} size={60} color="primary" />
      <Typography className={classes.text} variant="h6">
        Loading...
      </Typography>
    </div>
  )
}
