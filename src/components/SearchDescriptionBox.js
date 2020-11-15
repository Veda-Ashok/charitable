import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
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

export default function SearchDescriptionBox({ result, type }) {
  const classes = useStyles()
  let imageSrc = ''
  let name = ''
  let description = ''
  let url = ''
  let location = []
  let themes = []

  if (type === 'organizations') {
    imageSrc = result.logo_url
    description = result.mission
    location = result.countries
    themes = result.themes
    name = result.name
    url = result.url
  } else if (type === 'activities') {
    imageSrc = undefined
    description = result.description
    location = [result.country]
    themes = [result.theme]
    name = result.title
    url = result.project_link
  }

  return (
    <Card className={classes.root}>
      <Avatar className={classes.avatar} src={imageSrc} alt={name} />
      <Typography gutterBottom variant="h4">
        {name}
      </Typography>
      <CardActions>
        {url ? (
          <Fab variant="extended" color="primary" href={url} component={Link} naked>
            Visit Page
          </Fab>
        ) : (
          <Typography variant="h6" color="error">
            No Website Exists
          </Typography>
        )}

        {type === 'activities' && (
          <Fab
            variant="extended"
            color="secondary"
            href={result.progress_report_link}
            component={Link}
            naked>
            View Progress Report
          </Fab>
        )}
      </CardActions>
      <CardContent>
        <div>
          {type === 'activities' && (
            <div className={classes.section}>
              <Typography variant="body1">Status</Typography>
              <Typography variant="body2">{result.status}</Typography>
            </div>
          )}
          <div className={classes.section}>
            <Typography variant="body1">Location</Typography>
            <Typography variant="body2">{location.join(', ')}</Typography>
          </div>
          <div className={classes.section}>
            <Typography variant="body1">Themes</Typography>
            <Typography variant="body2">{themes.join(', ')}</Typography>
          </div>
        </div>
        <div className={classes.section}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">{description}</Typography>
          {type === 'activities' && (
            <div>
              <div className={classes.section}>
                <Typography variant="body1">Purpose</Typography>
                <Typography variant="body2">{result.purpose}</Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1">Summary</Typography>
                <Typography variant="body2">{result.summary}</Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1">Impact</Typography>
                <Typography variant="body2">{result.impact}</Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1">Contact Information</Typography>
                <Typography variant="body2">Name: {result.contact_name}</Typography>
                <Typography variant="body2">Contact us at: {result.contact_url}</Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1">Goal Funding</Typography>
                <Typography variant="body2">{result.goal_funding}</Typography>
                <Typography variant="body1">Donation Options</Typography>
                <Typography variant="body2">
                  {/* <ul>
                    {result.donation_options.map((option) => (
                      <li key={option[0]}>{`$${option[0]} ${option[1]}`}</li>
                    ))}
                  </ul> */}
                </Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="body1">Media: </Typography>
                {/* photo does not display */}
                <CardMedia image={result.image} title={name} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

SearchDescriptionBox.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string,
}
