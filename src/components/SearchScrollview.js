import React, { useState } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import SearchDescriptionBox from './SearchDescriptionBox'
import { makeStyles } from '@material-ui/core/styles'
import SearchListItems from './SearchListItems'
import Loading from './Loading'
import SearchDialog from './SearchDialog'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(1),
    height: '70vh',
  },
  scroll: {
    overflow: 'auto',
    width: '100%',
  },
}))

function SearchScrollview(props) {
  const classes = useStyles()
  if (props.results) {
    const [result, setResult] = useState(props.results[0])
    const [open, setOpen] = useState(false)

    const handleClickOpen = (result) => {
      if (isWidthUp('sm', props.width)) {
        setResult(result)
      } else {
        setOpen(true)
        setResult(result)
      }
    }

    const handleClose = () => {
      setOpen(false)
    }

    const listItems = props.results.map((result) => (
      <ListItem key={result.id}>
        <SearchListItems onClick={() => handleClickOpen(result)} result={result} saved={false} />
      </ListItem>
    ))

    return (
      <div className={classes.root}>
        <div className={classes.scroll}>
          <List>{listItems}</List>
        </div>
        {props.type !== 'users' &&
          (isWidthUp('sm', props.width) ? (
            <div className={classes.scroll}>
              <SearchDescriptionBox result={result} />
            </div>
          ) : (
            <SearchDialog result={result} open={open} onClose={handleClose} />
          ))}
      </div>
    )
  } else {
    return <Loading />
  }
}

SearchScrollview.propTypes = {
  results: PropTypes.array,
  type: PropTypes.string,
}

export default withWidth()(SearchScrollview)
