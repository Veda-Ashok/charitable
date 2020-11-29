import React, { useState } from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import DescriptionBox from './DescriptionBox'
import { makeStyles } from '@material-ui/core/styles'
import TrendingListItems from './TrendingListItems'
import Loading from './Loading'
import OrgDialog from './OrgDialog'
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

function TrendingScrollview(props) {
  const classes = useStyles()
  if (props.orgs) {
    const [org, setOrg] = useState(props.orgs[0])
    const [open, setOpen] = useState(false)

    const handleClickOpen = (org) => {
      if (isWidthUp('sm', props.width)) {
        setOrg(org)
      } else {
        setOpen(true)
        setOrg(org)
      }
    }

    const handleClose = () => {
      setOpen(false)
    }
    //Filter gets rid of duplicates
    let orgSet = new Set()
    const listItems = props.orgs
      .filter((org) => {
        let exists = orgSet.has(org.organization.id)
        orgSet.add(org.organization.id)
        return !exists
      })
      .map((org) => (
        <ListItem key={org.organization.name}>
          <TrendingListItems onClick={() => handleClickOpen(org)} orgDetails={org} />
        </ListItem>
      ))

    return (
      <div className={classes.root}>
        <div className={classes.scroll}>
          <List>{listItems}</List>
          {!isWidthUp('sm', props.width) && (
            <OrgDialog org={org} open={open} onClose={handleClose} charitUser={props.charitUser} />
          )}
        </div>
        {isWidthUp('sm', props.width) && (
          <div className={classes.scroll}>
            <DescriptionBox orgDetails={org} charitUser={props.charitUser} />
          </div>
        )}
      </div>
    )
  } else {
    return <Loading />
  }
}

TrendingScrollview.propTypes = {
  orgs: PropTypes.array,
  charitUser: PropTypes.object,
}

export default withWidth()(TrendingScrollview)
