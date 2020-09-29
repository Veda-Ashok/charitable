import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import PersonIcon from '@material-ui/icons/Person'
import Link from './Link'
import PropTypes from 'prop-types'

export default function ProfileDropdown({ user, page }) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const iconColor = page === 'Profile' ? 'primary' : undefined

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
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}>
        <PersonIcon color={iconColor} />
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
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    {user ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        naked
                        href="/api/logout">
                        Logout
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        naked
                        href="/api/login">
                        Login
                      </Button>
                    )}
                  </MenuItem>
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
