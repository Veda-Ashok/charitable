import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from './Link'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  buttonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default function IconWithLabel({ icon, label, trendingColor, path, ariaLabel }) {
  const classes = useStyles()

  return (
    <Button
      aria-label={ariaLabel}
      naked
      color={trendingColor}
      component={Link}
      classes={{ label: classes.buttonLabel }}
      href={path}>
      {icon}
      <div>
        <Typography className={classes.icon} variant="caption">
          {label}
        </Typography>
      </div>
    </Button>
  )
}

IconWithLabel.propTypes = {
  icon: PropTypes.object,
  label: PropTypes.string,
  trendingColor: PropTypes.string,
  path: PropTypes.string,
  ariaLabel: PropTypes.string,
}
