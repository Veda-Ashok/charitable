import NavigationBar from './NavigationBar'
import SearchScrollview from './SearchScrollview'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import axios from 'axios'
import Loading from './Loading'

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
  const type = router.query.type ? router.query.type : 'organizations'

  const [result, setResult] = useState('Loading')
  useEffect(() => {
    if (type === 'organizations') {
      axios
        .get(`/api/searchOrganizations/${query}`)
        .then((response) => {
          setResult(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (type === 'activities') {
      axios
        .get(`/api/searchActivities/${query}`)
        .then((response) => {
          setResult(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (type === 'users') {
      // axios
      //   .get(`/api/searchUsers/${query}`)
      //   .then((response) => {
      //     setResult(response.data)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }, [query])

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
              {result === 'Loading' ? (
                <Loading />
              ) : (
                <div>
                  {result.length <= 0 ? (
                    <Typography variant="h3">
                      No results for that search :( kinda cringe... Search something else!
                    </Typography>
                  ) : (
                    <SearchScrollview className={classes.scrollView} result={result} type={type} />
                  )}
                </div>
              )}
            </div>
          </Paper>
        </div>
      ) : (
        <div>
          <div className={classes.banner}>
            <Typography variant="h3">You did not search for anything...</Typography>
          </div>
        </div>
      )}
    </div>
  )
}

SearchPage.propTypes = {
  user: PropTypes.object,
}
