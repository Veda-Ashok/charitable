import NavigationBar from './NavigationBar'
import SearchScrollview from './SearchScrollview'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { mockSearch } from '../tests/MockAPI/MockSearch'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(11),
  },
  title: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  results: {
    padding: '1rem',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function SearchPage(props) {
  const classes = useStyles()
  const router = useRouter()
  const query = router.query.query
  // Handle for when type is undefined
  // const type = router.query.type

  return (
    <div>
      <NavigationBar user={props.user} page="Search" />
      {query ? (
        <div>
          <div className={classes.banner}>
            <Paper className={classes.title}>
              <Typography variant="h5">Search Results for &quot;{query}&quot;</Typography>
            </Paper>
          </div>
          <Paper className={classes.results}>
            <div>
              <SearchScrollview className={classes.scrollView} results={mockSearch.result} />
            </div>
          </Paper>
        </div>
      ) : (
        <div>
          <div className={classes.banner}>
            <Paper className={classes.results}>
              <Typography variant="h3">You did not search for anything...</Typography>
            </Paper>
          </div>
        </div>
      )}
    </div>
  )
}

SearchPage.propTypes = {
  user: PropTypes.object,
}
