import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
// import Link from './Link'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: '1rem',
  },
  topText: {
    padding: '0rem 1rem',
    margin: '0 .5rem',
  },
})

// <CardActionArea>
//         <CardMedia className={classes.media} image="/media/unicef.png" title="fakeorg" />
//         <Typography gutterBottom variant="h4">
//           {orgDetails.organization.name}
//         </Typography>
//         <Typography variant="body2">Location</Typography>
//         <CardActions>
//           <Button
//             size="small"
//             color="primary"
//             href="https://www.unicefusa.org/"
//             component={Link}
//             naked>
//             Donate Here
//           </Button>
//         </CardActions>
//         <CardContent>
//           <Typography variant="body2">Classification: {orgDetails.themes.theme[0].name}</Typography>
//           <Typography variant="body2">
//             Mission Statement: {orgDetails.organization.mission}
//           </Typography>
//         </CardContent>
//       </CardActionArea>

export default function OrgInfoSmallBox({ orgDetails }) {
  const classes = useStyles()

  return (
    <Paper variant="outlined" className={classes.root}>
      <Avatar src={orgDetails.organization.logoUrl} />
      <div className={classes.topText}>
        <Typography variant="body1">{orgDetails.organization.name}</Typography>
        <Typography color="textSecondary" variant="caption">
          {orgDetails.organization.themes.theme[0].name}
        </Typography>
      </div>
    </Paper>
  )
}

OrgInfoSmallBox.propTypes = {
  orgDetails: PropTypes.object,
}
