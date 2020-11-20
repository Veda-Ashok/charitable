import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Link from './Link'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  heart: {
    height: theme.spacing(5),
    marginLeft: 'auto',
  },
  leftSymbols: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  innerBox: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
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

export default function SearchListItems({ result, onClick, type }) {
  let imageSrc = ''
  let name = ''
  let theme = []

  console.log('searchlistitems', result)
  if (type === 'organizations') {
    imageSrc = result.logo_url
    name = result.name
    theme = result.themes
  } else if (type === 'activities') {
    //TODO: We need to have a lookup query to get the logo image of the org connected to the activity
    imageSrc = undefined
    theme = [result.theme]
    name = result.title
  } else if (type === 'users') {
    imageSrc = result.profile_picture
    name = result.name
    theme = [result.nickname]
  }

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      {type === 'users' ? (
        <CardActionArea href={`/profile/${result.nickname}`} component={Link} naked>
          <CardContent>
            <div className={classes.leftSymbols}>
              <Avatar className={classes.avatar} src={imageSrc} alt={name} />
              <div className={classes.text}>
                <Typography variant="body1">{name}</Typography>
                <Typography color="textSecondary" variant="caption">
                  {theme.slice(0, 5).join(', ')}
                </Typography>
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      ) : (
        <div className={classes.leftSymbols}>
          <CardActionArea onClick={onClick} className={classes.innerBox}>
            <Avatar className={classes.avatar} src={imageSrc} alt={name} />
            <div className={classes.text}>
              <Typography variant="body1">{name}</Typography>
              <Typography color="textSecondary" variant="caption">
                {theme.slice(0, 5).join(', ')}
              </Typography>
            </div>
          </CardActionArea>
        </div>
      )}
    </Card>
  )
}

SearchListItems.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
}
