import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import PostDialog from './PostDialog'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PostAddIcon from '@material-ui/icons/PostAdd'
import SavedDialog from './SavedDialog'
import Loading from './Loading'
import UsersOnlyDialog from './UsersOnlyDialog'
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative',
  },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  section: {
    paddingBottom: theme.spacing(1),
  },
  button: {
    float: 'right',
  },
}))

export default function DescriptionBox({ orgDetails, dbuser }) {
  const classes = useStyles()
  const themes = orgDetails.organization.themes.theme
  const countries = orgDetails.organization.countries.country
  /*TODO: get the current user object and pass it down to here from the top level*/
  let userId = dbuser?._id || undefined
  let userVerified = dbuser?.email_verified || false
  const [postOpen, setPostOpen] = useState(false)
  const [savedOpen, setSavedOpen] = useState(false)
  const [verifyUserOpen, setVerifyUserOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getIsSaved = async () => {
      setLoading(true)
      try {
        if (userId && userVerified) {
          const response = await axios.get(`/api/getSavedOrgsIDs/${userId}`)
          setIsSaved(response.data.includes(orgDetails.organization.id.toString()))
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getIsSaved()
  }, [orgDetails])

  const handleClickPostOpen = () => {
    if (!userId || !userVerified) {
      handleVerifyUserOpen()
    } else {
      setPostOpen(true)
    }
  }

  const handlePostClose = () => {
    setPostOpen(false)
  }

  const handleVerifyUserOpen = () => {
    setVerifyUserOpen(true)
  }

  const handleVerifyUserClose = () => {
    setVerifyUserOpen(false)
  }

  async function handleClickSavedOpen() {
    if (!userId || !userVerified) {
      handleVerifyUserOpen()
    } else {
      try {
        let response
        if (isSaved) {
          response = await axios.post('/api/deleteSavedOrgs', {
            result: { gg_id: orgDetails.organization.id.toString() },
            userId: userId,
          })
        } else {
          response = await axios.post('/api/addSavedOrgs', {
            result: { gg_id: orgDetails.organization.id.toString() },
            userId: userId,
          })
        }
        if (response.data.matchedCount === 1 && response.data.modifiedCount === 1) {
          setIsSaved(!isSaved)
          setSavedOpen(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleSavedClose = () => {
    setSavedOpen(false)
  }

  return (
    <Card className={classes.root}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <IconButton className={classes.button} onClick={() => handleClickSavedOpen()}>
            {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton className={classes.button} onClick={() => handleClickPostOpen()}>
            <PostAddIcon />
          </IconButton>
          <Avatar
            className={classes.avatar}
            src={orgDetails.organization.logoUrl}
            alt={orgDetails.organization.name}
          />
          <PostDialog
            open={postOpen}
            onClose={handlePostClose}
            org={orgDetails.organization}></PostDialog>
          <SavedDialog
            open={savedOpen}
            onClose={handleSavedClose}
            isSaved={isSaved}
            name={orgDetails.organization.name}
          />
          <UsersOnlyDialog open={verifyUserOpen} onClose={handleVerifyUserClose} />
          <Typography gutterBottom variant="h4">
            {orgDetails.organization.name}
          </Typography>
          <CardActions>
            <Fab
              variant="extended"
              color="primary"
              href={orgDetails.organization.url}
              target="_blank"
              rel="noopener noreferrer">
              Visit Site
            </Fab>
          </CardActions>
          <CardContent>
            <div className={classes.section}>
              <Typography variant="h6">Location</Typography>
              <Typography variant="body2">
                {countries.map((country, i, arr) =>
                  i != arr.length - 1 ? country.name + ', ' : country.name + ''
                )}
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="h6">Themes</Typography>
              <Typography variant="body2">
                {themes.map((theme, i, arr) =>
                  i != arr.length - 1 ? theme.name + ', ' : theme.name + ''
                )}
              </Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="h6">Mission Statement</Typography>
              <Typography variant="body2">{orgDetails.organization.mission}</Typography>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}

DescriptionBox.propTypes = {
  orgDetails: PropTypes.object,
  dbuser: PropTypes.object,
}
