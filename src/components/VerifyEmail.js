import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(14),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  verify: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}))

export default function VerifyEmail() {
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <div className={classes.verify}>
        <DraftsTwoToneIcon fontSize="large" className={classes.icon} />
        <h2>Verify your email to access this page</h2>
      </div>
    </div>
  )
}
