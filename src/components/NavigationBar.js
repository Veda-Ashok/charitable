import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ProfileDropdown from './ProfileDropdown'
import PropTypes from 'prop-types'
import TrendingUp from '@material-ui/icons/TrendingUp'
import Home from '@material-ui/icons/Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { fade, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import IconWithLabelPath from './IconWithLabelPath'
import SearchFilter from './SearchFilter'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: '2rem',
      height: '2rem',
      marginRight: theme.spacing(1),
    },
  },
  title: {
    pointerEvents: 'none',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.03),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function NavigationBar({ user, page }) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [type, setType] = useState(router.query.type ? router.query.type : 'organizations')

  const handleChange = (e) => {
    setType(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/search',
      query: { query: searchValue, type: type },
    })
  }

  const classes = useStyles()

  const trendingColor = page === 'Trending' ? 'primary' : 'inherit'
  const timelineColor = page === 'Timeline' ? 'primary' : 'inherit'

  return (
    <div className={classes.grow}>
      <AppBar color="inherit">
        <Toolbar>
          <img alt="charitable-logo" className={classes.logo} src="/media/Logo.svg" />
          <Typography className={classes.title} variant="h6" noWrap>
            Charitable
          </Typography>
          <form onSubmit={onSubmit}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </form>
          <div>
            <SearchFilter handleChange={handleChange} type={type} />
          </div>
          <div className={classes.grow} />
          <IconWithLabelPath
            icon={<TrendingUp />}
            label="Trending"
            trendingColor={trendingColor}
            path={'/'}
            ariaLabel="Trending Button"
          />
          <IconWithLabelPath
            icon={<Home />}
            label="Timeline"
            trendingColor={timelineColor}
            path={user ? '/timeline' : '/api/login'}
            ariaLabel="Timeline Button"
          />
          <ProfileDropdown user={user} page={page} />
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  page: PropTypes.string,
}
