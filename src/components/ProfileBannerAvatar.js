import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
    flexShrink: 0,
  },
}))

export default function ProfileBannerAvatar(props) {
  const classes = useStyles()

  return (
    <Box
      borderRadius="50%"
      bgcolor="background.paper"
      borderColor="text.primary"
      style={{
        width: '6rem',
        height: '6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Avatar className={classes.avatar} alt={props.name} src={props.icon}></Avatar>
    </Box>
  )
}

ProfileBannerAvatar.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
}
