import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FullscreenExit, ViewColumn } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    display: FullscreenExit,
    margin: 30,
    direction: ViewColumn,
    maxWidth: 345,
  },
  createPost_top: {
    display: FullscreenExit,
    border: 1,
    padding: 15,
  },
  createPost_bottom: {
    flex: 1,
    display: FullscreenExit,
  },
})

export default function CreatePostBox() {
  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={classes.root}>
      <div className={classes.createPost_top}>
        <Avatar>N</Avatar>
        <form>
          <input
            className={classes.createPost__input}
            placeHolder={'What cause are you passionate about?'}
          />
          <Button variant="contained" color="primary">
            Post
          </Button>

          <button onClick={handleSubmit} type="submit">
            <div className="createPost__option">
              <h3>Attach Image</h3>
              <h3>Attach File</h3>
              <h3>Include Organization/Event</h3>
            </div>
          </button>
        </form>
      </div>

      <div className="createPost_bottom" />
    </div>
  )
}
