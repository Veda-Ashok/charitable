import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
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

export default function TrendingListItems({ orgDetails, saved, onClick }) {
  const details = orgDetails
  const handleSaved = () => {
    //Hit the api and save/unsave in the DB
  }
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <div className={classes.leftSymbols}>
            <Avatar
              className={classes.avatar}
              src={details.organization.logoUrl}
              alt={orgDetails.organization.name}
            />
            <div className={classes.text}>
              <Typography variant="body1">{details.organization.name}</Typography>
              <Typography color="textSecondary" variant="caption">
                {details.themes.theme[0].name}
              </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <div>
        <IconButton onClick={handleSaved}>
          {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </Card>
  )
}

TrendingListItems.propTypes = {
  orgDetails: PropTypes.object,
  saved: PropTypes.bool,
  onClick: PropTypes.function,
}
