import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchListItems from './SearchListItems'
import SearchDialog from './SearchDialog'
// import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  orgs: {
    marginTop: theme.spacing(1),
    maxHeight: '80vh',
    overflow: 'auto',
    width: '100%',
  },
}))

export default function SavedScrollview({ results, type, viewer, refresh, setRefresh }) {
  const classes = useStyles()
  if (results) {
    const [currentResult, setCurrentResult] = useState(results[0])
    const [open, setOpen] = useState(false)

    const handleClickOpen = (result) => {
      setCurrentResult(result)
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const listItems = results.map((result) => (
      <ListItem key={result._id}>
        <SearchListItems onClick={() => handleClickOpen(result)} result={result} type={type} />
      </ListItem>
    ))

    return (
      <div>
        <Paper className={classes.orgs}>
          <List>{listItems}</List>
          <SearchDialog
            result={currentResult}
            open={open}
            onClose={handleClose}
            type={type}
            charitUser={viewer}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Paper>
      </div>
    )
  } else {
    return <Paper className={classes.orgs} />
  }
}

SavedScrollview.propTypes = {
  results: PropTypes.array,
  viewer: PropTypes.object,
  type: PropTypes.string,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
}
