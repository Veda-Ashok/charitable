import NavigationBar from './NavigationBar'
import TrendingScrollview from './TrendingScrollview'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { searchFeatured } from '../apicalls/globalGivingApi'
import Paper from '@material-ui/core/Paper'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
  organizations: {
    padding: '1rem',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function TrendingPage({ user }) {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [orgs, setOrgs] = useState(null)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await searchFeatured('featured/projects')
        setOrgs(response)
        setIsLoading(false)
      } catch (error) {
        setError(error.statusText)
      } finally {
        !didCancel && setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [])

  return (
    <div>
      <NavigationBar user={user} page="Trending" />
      <div className={classes.banner}>
        <Paper className={classes.title}>
          <Typography variant="h5">Trending Organizations</Typography>
        </Paper>
      </div>
      <Paper className={classes.organizations}>
        <div>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Typography>{error}</Typography>
          ) : (
            <TrendingScrollview
              className={classes.scrollView}
              orgs={orgs ? orgs.projects.project : null}
            />
          )}
        </div>
      </Paper>
    </div>
  )
}

TrendingPage.propTypes = {
  user: PropTypes.object,
}
