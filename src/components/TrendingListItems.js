import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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

export default function TrendingListItems({ orgDetails, onClick }) {
  const details = orgDetails
  const classes = useStyles()
  const icon = details.organization.logoUrl
    ? details.organization.logoUrl
    : details.organization_logo_url
  let themes = []
  for (const theme of details.themes.theme) {
    themes.push(theme.name)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <div className={classes.leftSymbols}>
            <Avatar className={classes.avatar} src={icon} alt={orgDetails.organization.name} />
            <div className={classes.text}>
              <Typography variant="body1">{details.organization.name}</Typography>
              <Typography color="textSecondary" variant="caption">
                {themes.slice(0, 5).join(', ')}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

TrendingListItems.propTypes = {
  orgDetails: PropTypes.object,
  onClick: PropTypes.func,
}
