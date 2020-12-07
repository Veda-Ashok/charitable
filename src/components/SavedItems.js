import React from 'react'
import PropTypes from 'prop-types'
import SavedScrollview from './SavedScrollview'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function SavedItems({ orgs, activities, owner, viewer, refresh, setRefresh }) {
  const classes = useStyles()
  return (
    <div>
      <Paper className={classes.title}>
        <Typography variant="h6">Saved Organizations</Typography>
      </Paper>
      {orgs.length <= 0 ? (
        <h1>You have no saved orgs</h1>
      ) : (
        <SavedScrollview
          owner={owner}
          viewer={viewer}
          results={orgs}
          type="organizations"
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
      <Paper className={classes.title}>
        <Typography variant="h6">Saved Activities</Typography>
      </Paper>
      {activities.length <= 0 ? (
        <h1>You have no saved activities</h1>
      ) : (
        <SavedScrollview
          owner={owner}
          viewer={viewer}
          results={activities}
          type="activities"
          setRefresh={setRefresh}
          refresh={refresh}
        />
      )}
    </div>
  )
}

SavedItems.propTypes = {
  orgs: PropTypes.array,
  activities: PropTypes.array,
  owner: PropTypes.object,
  viewer: PropTypes.object,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
}
