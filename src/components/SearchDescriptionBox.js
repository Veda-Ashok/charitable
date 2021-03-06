import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PostAddIcon from '@material-ui/icons/PostAdd'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import PostDialog from './PostDialog'
import Loading from './Loading'
import SavedDialog from './SavedDialog'
import UsersOnlyDialog from './UsersOnlyDialog'
import SuccessfulPostDialog from './SuccessfulPostDialog'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: { overflow: 'auto', width: '100%' },
  avatar: {
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  section: {
    paddingBottom: theme.spacing(1),
  },
  warning: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  button: {
    float: 'right',
  },
}))
export default function SearchDescriptionBox({
  result,
  type,
  charitUser,
  refresh,
  setRefresh,
  getPosts,
}) {
  const classes = useStyles()
  let _id = ''
  let imageSrc = ''
  let name = ''
  let description = ''
  let url = ''
  let location = []
  let themes = []
  let userId = charitUser?._id || undefined
  let userVerified = charitUser?.email_verified || false
  if (type === 'organizations') {
    imageSrc = result.logo_url
    description = result.mission
    location = result.countries
    themes = result.themes
    name = result.name
    url = result.url
    _id = result.gg_id
  } else if (type === 'activities') {
    imageSrc = result.organization_logo_url[0]
    description = result.description
    location = [result.country]
    themes = [result.theme]
    name = result.title
    _id = result._id
    url = result.project_link
  }

  const [postOpen, setPostOpen] = useState(false)
  const [verifyUserOpen, setVerifyUserOpen] = useState(false)
  const [savedOpen, setSavedOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccessOpen] = useState(false)

  useEffect(() => {
    const getIsSaved = async () => {
      setLoading(true)
      try {
        if (userId && userVerified) {
          let response
          if (type === 'organizations') {
            response = await axios.get(`/api/getSavedOrgsIDs/${userId}`)
          } else if (type === 'activities') {
            response = await axios.get(`/api/getSavedActivitiesIDs/${userId}`)
          }
          setIsSaved(response.data.includes(_id))
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getIsSaved()
  }, [result])

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
        if (type === 'activities') {
          if (isSaved) {
            response = await axios.post('/api/deleteSavedActivities', {
              result: result,
              userId: userId,
            })
          } else {
            response = await axios.post('/api/addSavedActivities', {
              result: result,
              userId: userId,
            })
          }
        } else if (type === 'organizations') {
          if (isSaved) {
            response = await axios.post('/api/deleteSavedOrgs', {
              result: result,
              userId: userId,
            })
          } else {
            response = await axios.post('/api/addSavedOrgs', {
              result: result,
              userId: userId,
            })
          }
        }
        if (response.data.matchedCount === 1 && response.data.modifiedCount === 1) {
          setIsSaved(!isSaved)
          setSavedOpen(true)
          setRefresh(!refresh)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleSavedClose = () => {
    setSavedOpen(false)
  }

  const handleSuccessOpen = () => {
    setSuccessOpen(true)
  }

  const handleSuccessClose = () => {
    setSuccessOpen(false)
  }

  return (
    <Card className={classes.root}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <CardContent>
            <IconButton onClick={() => handleClickSavedOpen()} className={classes.button}>
              {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton onClick={() => handleClickPostOpen()} className={classes.button}>
              <PostAddIcon />
            </IconButton>
            <Avatar className={classes.avatar} src={imageSrc} alt={name} />
            <Typography gutterBottom variant="h4">
              {name}
            </Typography>
            <PostDialog
              open={postOpen}
              onClose={handlePostClose}
              result={result}
              type={type}
              charitUser={charitUser}
              handleSuccessOpen={handleSuccessOpen}
              getPosts={getPosts}></PostDialog>
            <SavedDialog
              open={savedOpen}
              onClose={handleSavedClose}
              isSaved={isSaved}
              name={name}
            />
            <UsersOnlyDialog open={verifyUserOpen} onClose={handleVerifyUserClose} />
            <SuccessfulPostDialog open={success} onClose={handleSuccessClose} user={charitUser} />
          </CardContent>
          <CardActions>
            {url ? (
              <Fab
                variant="extended"
                color="primary"
                href={url}
                target="_blank"
                rel="noopener noreferrer">
                Visit Page
              </Fab>
            ) : (
              <Typography variant="h6" color="error">
                No Website Exists
              </Typography>
            )}

            {type === 'activities' && (
              <Fab
                variant="extended"
                color="secondary"
                href={result.progress_report_link}
                target="_blank"
                rel="noopener noreferrer">
                View Progress Report
              </Fab>
            )}
          </CardActions>
          <CardContent>
            <div>
              {type === 'activities' && (
                <div>
                  <div className={classes.warning}>
                    <Typography variant="caption" color="error">
                      ** If you get a 403 ERROR when accessing either of the above links, clear your
                      cookies on the site **
                    </Typography>
                  </div>
                  <div className={classes.section}>
                    <Typography variant="h6">Status</Typography>
                    <Typography variant="body2">{result.status}</Typography>
                  </div>
                </div>
              )}
              <div className={classes.section}>
                <Typography variant="h6">Location</Typography>
                <Typography variant="body2">{location.join(', ')}</Typography>
              </div>
              <div className={classes.section}>
                <Typography variant="h6">Themes</Typography>
                <Typography variant="body2">{themes.join(', ')}</Typography>
              </div>
            </div>
            <div className={classes.section}>
              <Typography variant="h6">Description</Typography>
              <Typography variant="body2">{description}</Typography>
            </div>
            {type === 'activities' && (
              <div>
                <div className={classes.section}>
                  <Typography variant="h6">Purpose</Typography>
                  <Typography variant="body2">{result.purpose}</Typography>
                </div>
                <div className={classes.section}>
                  <Typography variant="h6">Summary</Typography>
                  <Typography variant="body2">{result.summary}</Typography>
                </div>
                <div className={classes.section}>
                  <Typography variant="h6">Impact</Typography>
                  <Typography variant="body2">{result.impact}</Typography>
                </div>
                <div className={classes.section}>
                  <Typography variant="h6">Contact Information</Typography>
                  <Typography variant="body2">Name: {result.contact_name}</Typography>
                  <Typography variant="body2">Contact us at: {result.contact_url}</Typography>
                </div>
                <div className={classes.section}>
                  <Typography variant="h6">Goal Funding</Typography>
                  <Typography variant="body2">{result.goal_funding}</Typography>
                  <Typography variant="h6">Donation Options</Typography>
                  <ul>
                    {result.donation_options.map((option) => (
                      <li key={option[0]}>{`$${option[0]} ${option[1]}`}</li>
                    ))}
                  </ul>
                </div>
                <div className={classes.section}>
                  <Typography variant="h6">Media </Typography>
                </div>
              </div>
            )}
          </CardContent>
          {type === 'activities' && (
            <CardMedia className={classes.media} image={result.image} title={name} />
          )}
        </>
      )}
    </Card>
  )
}

SearchDescriptionBox.propTypes = {
  result: PropTypes.object,
  type: PropTypes.string,
  charitUser: PropTypes.object,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.any,
  getPosts: PropTypes.any,
}
