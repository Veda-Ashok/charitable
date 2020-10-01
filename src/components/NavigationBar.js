import React from 'react'
import Link from '@material-ui/core/Link'
import ProfileDropdown from './ProfileDropdown'
import PropTypes from 'prop-types'
import TrendingUp from '@material-ui/icons/TrendingUp'
import Home from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'

export default function NavigationBar({ user, page }) {
  const trendingColor = page === 'Trending' ? 'primary' : 'inherit'
  const timelineColor = page === 'Timeline' ? 'primary' : 'inherit'

  /*
  TODO: The user prop isnt passed out of the trending page...
   */

  return (
    <div>
      <Link href="/search">Search</Link>
      <IconButton aria-label="Trending Button" color={trendingColor} component={Link} href="/">
        <TrendingUp />
      </IconButton>
      <IconButton
        aria-label="Timeline Button"
        color={timelineColor}
        component={Link}
        naked="true"
        href="/timeline">
        <Home />
      </IconButton>
      <ProfileDropdown user={user} page={page} />
    </div>
  )
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  page: PropTypes.string,
}
