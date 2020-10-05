import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Link from './Link'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function DescriptionBox({ orgDetails }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="/media/unicef.png" title="fakeorg" />
        <Typography gutterBottom variant="h4">
          {orgDetails.organization.name}Organization
        </Typography>
        <Typography variant="body2">Location</Typography>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href="https://www.unicefusa.org/"
            component={Link}
            naked>
            Donate Here
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="body2">Classification: {orgDetails.themes.theme[0].name}</Typography>
          <Typography variant="body2">
            Mission Statement: {orgDetails.organization.mission}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

DescriptionBox.propTypes = {
  orgDetails: PropTypes.object,
}
