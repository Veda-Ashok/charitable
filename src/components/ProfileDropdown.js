import React from 'react'
import { useEffect, useRef, useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import PersonIcon from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import Link from './Link'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  buttonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default function ProfileDropdown({ user, page }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const iconColor = page === 'Profile' ? 'primary' : 'inherit'
  const classes = useStyles()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Button
        color={iconColor}
        aria-label="ProfileButton"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        classes={{ label: classes.buttonLabel }}
        onClick={handleToggle}>
        <PersonIcon />
        <Typography variant="caption">Profile</Typography>
      </Button>
      <Popper
        //Popper adds an inline-style with a transform: translate3d() which causes blurriness
        modifiers={{
          computeStyle: {
            gpuAcceleration: false,
          },
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose} component={Link} naked href="/profile">
                    My Profile
                  </MenuItem>
                  {user ? (
                    <MenuItem
                      onClick={handleClose}
                      color="secondary"
                      component={Link}
                      naked
                      href="/api/logout">
                      Logout
                    </MenuItem>
                  ) : (
                    <MenuItem
                      onClick={handleClose}
                      color="primary"
                      component={Link}
                      naked
                      href="/api/login">
                      Login
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

ProfileDropdown.propTypes = {
  user: PropTypes.object,
  page: PropTypes.string,
}
