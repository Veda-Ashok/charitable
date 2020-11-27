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
  if (props.result) {
    const [result, setResult] = useState(props.result[0])
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

    const listItems = props.result.map((result) => (
      <ListItem key={result._id}>
        <SearchListItems
          onClick={() => handleClickOpen(result)}
          type={props.type}
          result={result}
        />
      </ListItem>
    ))

    return (
      <div className={classes.root}>
        <div className={classes.scroll}>
          <List>{listItems}</List>
        </div>
        {props.type !== 'users' &&
          (isWidthUp('sm', props.width) ? (
            <SearchDescriptionBox result={result} type={props.type} charitUser={props.charitUser} />
          ) : (
            <SearchDialog
              result={result}
              open={open}
              onClose={handleClose}
              type={props.type}
              charitUser={props.charitUser}
            />
          ))}
      </div>
    )
  } else {
    return <Loading />
  }
}

SearchScrollview.propTypes = {
  result: PropTypes.array,
  type: PropTypes.string,
  charitUser: PropTypes.object,
}

export default withWidth()(SearchScrollview)
