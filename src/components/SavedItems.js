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
  noContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
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
        <Paper className={classes.noContent}>
          <h2>You have no saved organizations to display</h2>
        </Paper>
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
        <Paper className={classes.noContent}>
          <h2>You have no saved activities to display</h2>
        </Paper>
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
