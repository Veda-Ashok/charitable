import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PostDialog from './PostDialog'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PostAddIcon from '@material-ui/icons/PostAdd'

// comment for testing
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  section: {
    paddingBottom: theme.spacing(1),
  },
  button: {
    float: 'right',
  },
}))

export default function DescriptionBox({ orgDetails }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const themes = orgDetails.themes.theme
  const countries = orgDetails.countries.country
  const saved = false

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card className={classes.root}>
      <IconButton className={classes.button}>
        {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      <IconButton className={classes.button}>
        <PostAddIcon onClick={() => handleClickOpen()} />
      </IconButton>
      <Avatar
        className={classes.avatar}
        src={orgDetails.organization.logoUrl}
        alt={orgDetails.organization.name}
      />
      <PostDialog open={open} onClose={handleClose} org={orgDetails.organization}></PostDialog>
      <Typography gutterBottom variant="h4">
        {orgDetails.organization.name}
      </Typography>
      <CardActions>
        <Fab
          variant="extended"
          color="primary"
          href={orgDetails.organization.url}
          target="_blank"
          rel="noopener noreferrer">
          Visit Site
        </Fab>
      </CardActions>
      <CardContent>
        <div className={classes.section}>
          <Typography variant="h6">Location</Typography>
          <Typography variant="body2">
            {countries.map((country, i, arr) =>
              i != arr.length - 1 ? country.name + ', ' : country.name + ''
            )}
          </Typography>
        </div>
        <div className={classes.section}>
          <Typography variant="h6">Themes</Typography>
          <Typography variant="body2">
            {themes.map((theme, i, arr) =>
              i != arr.length - 1 ? theme.name + ', ' : theme.name + ''
            )}
          </Typography>
        </div>
        <div className={classes.section}>
          <Typography variant="h6">Mission Statement</Typography>
          <Typography variant="body2">{orgDetails.organization.mission}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

DescriptionBox.propTypes = {
  orgDetails: PropTypes.object,
}
