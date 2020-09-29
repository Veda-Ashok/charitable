import React from 'react'
import Link from '@material-ui/core/Link'
import ProfileDropdown from './ProfileDropdown'
import PropTypes from 'prop-types'
import TrendingUp from '@material-ui/icons/TrendingUp'
import Home from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'

export default function NavBar({ user, page }) {
  const trendingColor = page === 'Trending' ? 'primary' : undefined
  const timelineColor = page === 'Timeline' ? 'primary' : undefined

  /*TODO: The user prop isnt passed out of the trending page...
   */

  return (
    <div>
      <Link href="/search">Search</Link>
      <Button component={Link} naked href="/">
        <TrendingUp color={trendingColor} />
      </Button>
      <Button component={Link} naked href="/timeline">
        <Home color={timelineColor} />
      </Button>
      <ProfileDropdown user={user} page={page} />
    </div>
  )
}

NavBar.propTypes = {
  user: PropTypes.object,
  page: PropTypes.string,
}
