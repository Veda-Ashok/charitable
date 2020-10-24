import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Link from './Link'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  section: {
    paddingBottom: theme.spacing(1),
  },
}))

export default function SearchDescriptionBox({ result }) {
  const classes = useStyles()
  let imageSrc = ''
  let name = result.name
  let description = ''
  let type = result.type
  let url = ''
  let location = []
  let themes = []

  if (type === 'organization') {
    imageSrc = result.logo_url
    description = result.mission
    location = result.countries
    themes = result.themes
    url = result.url
  } else if (type === 'activity') {
    imageSrc = undefined
    description = result.description
    location.push(result.street_address)
    location.push(result.country)
    themes = result.themes
    url = result.url
  } else if (type === 'user') {
    imageSrc = result.profile_picture
    description = result.bio
    url = ''
  }

  return (
    <Card className={classes.root}>
      <Avatar className={classes.avatar} src={imageSrc} alt={name} />
      <Typography gutterBottom variant="h4">
        {name}
      </Typography>
      <CardActions>
        <Fab variant="extended" color="primary" href={url} component={Link} naked>
          Visit Page
        </Fab>
      </CardActions>
      <CardContent>
        {type !== 'user' && (
          <div>
            <div className={classes.section}>
              <Typography variant="body1">Location</Typography>
              <Typography variant="body2">
                {location.map((location, i, arr) =>
                  i != arr.length - 1 ? location + ', ' : location + ''
                )}
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="body1">Themes</Typography>
              <Typography variant="body2">
                {themes.map((theme, i, arr) => (i != arr.length - 1 ? theme + ', ' : theme + ''))}
              </Typography>
            </div>
          </div>
        )}
        <div className={classes.section}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">{description}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

SearchDescriptionBox.propTypes = {
  result: PropTypes.object,
}
