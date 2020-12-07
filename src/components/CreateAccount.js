import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Link from './Link'

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
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}))

export default function CreateAccount() {
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <div className={classes.verify}>
        <h2>Please log in or create an account to view this page</h2>
        <Button
          aria-label="login/signup"
          naked
          variant="contained"
          color="primary"
          component={Link}
          href="/api/login">
          Login/Signup
        </Button>
      </div>
    </div>
  )
}
