import NavigationBar from './NavigationBar'
import Scrollview from './Scrollview'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { searchFeatured } from '../api/globalGivingApi'
import TalkToFlask from './TalkToFlask'
import React, { useState, useEffect } from 'react'

export default function TrendingPage({ user }) {
  const [isLoading, setIsLoading] = useState(false)
  const [orgs, setOrgs] = useState(null)

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
        console.error(error)
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
    <div className="container">
      <main>
        <nav>
          <NavigationBar user={user} page="Trending" />
        </nav>
        <div>
          <Typography variant="h1">Trending</Typography>
          <TalkToFlask />
        </div>
        <div>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <Scrollview orgs={orgs ? orgs.projects.project : null}></Scrollview>
          )}
        </div>
      </main>
    </div>
  )
}

TrendingPage.propTypes = {
  user: PropTypes.object,
}
