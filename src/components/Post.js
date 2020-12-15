import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import InfoSmallBox from './InfoSmallBox'
import Link from './Link'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  top: {
    display: 'flex',
    padding: '1rem',
  },
  topForm: {
    flex: 1,
    display: 'flex',
  },
  topText: {
    padding: '0rem 1rem',
    margin: '0 .5rem',
  },
  bottom: {
    padding: '1rem',
  },
  headerOuter: {
    display: 'flex',
    borderBottom: '1px solid #eff2f5',
  },
})

export default function PostBox({
  name,
  isProfile,
  nickname,
  icon,
  time,
  typedContent,
  image,
  orgDetails,
  activityDetails,
  viewer,
  refresh,
  setRefresh,
  editable,
  postId,
}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  async function handleDeletePost() {
    try {
      let response = await axios.post(`/api/deletePost`, { postId: postId })
      if (response.data.deletedCount === 1) {
        setRefresh(!refresh)
      } else {
        handleOpen()
      }
    } catch (error) {
      console.error(error)
    }
  }

  let header = (
    <div className={classes.top}>
      <Avatar alt={name} src={icon}></Avatar>
      <div className={classes.topText}>
        <Typography variant="body1">{name}</Typography>
        <Typography color="textSecondary" variant="caption">
          {time}
        </Typography>
      </div>
    </div>
  )

  return (
    <Card className={classes.root}>
      {isProfile ? (
        <div className={classes.headerOuter}>
          <CardActionArea>{header}</CardActionArea>
          <div>
            {editable && (
              <div>
                <IconButton aria-label="delete" onClick={handleDeletePost}>
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={classes.headerOuter}>
          <CardActionArea href={`/profile/${nickname}`} as={Link}>
            {header}
          </CardActionArea>
          <div>
            {editable && (
              <div>
                <IconButton aria-label="delete" onClick={handleDeletePost}>
                  <CloseIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={classes.bottom}>
        <Typography variant="body1">{typedContent}</Typography>
      </div>
      {image && <img alt="postPhoto" src={image} />}
      {orgDetails && (
        <InfoSmallBox
          result={orgDetails}
          type="organizations"
          showPopup
          charitUser={viewer}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {activityDetails && (
        <InfoSmallBox
          result={activityDetails}
          refresh={refresh}
          setRefresh={setRefresh}
          type="activities"
          showPopup
          charitUser={viewer}
        />
      )}
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <div className={classes.root}>
          <DialogTitle>
            <Typography>Sorry, we could not delete your post :(</Typography>
          </DialogTitle>
        </div>
      </Dialog>
    </Card>
  )
}

PostBox.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
  icon: PropTypes.string,
  time: PropTypes.string,
  typedContent: PropTypes.string,
  image: PropTypes.string,
  orgDetails: PropTypes.object,
  activityDetails: PropTypes.object,
  viewer: PropTypes.object,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  isProfile: PropTypes.bool,
  editable: PropTypes.bool,
  postId: PropTypes.string,
}
