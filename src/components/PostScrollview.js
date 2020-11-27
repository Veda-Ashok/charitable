import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import PostBox from './Post'
import Loading from './Loading'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  post: {
    marginTop: theme.spacing(1),
    maxHeight: '70vh',
    overflow: 'auto',
    maxWidth: '50rem',
  },
}))

export default function PostScrollview({ posts, viewer }) {
  /*
  TODO: Change these values depending on the objects returned by the API call
  */
  const classes = useStyles()
  if (posts) {
    const listItems = posts.map((post) => (
      <ListItem key={post.name}>
        <PostBox
          name={post.name}
          icon={post.icon}
          time={post.time}
          typedContent={post.typedContent}
          image={post.image}
          viewer={viewer}
          orgDetails={post.orgDetails}
          activityDetails={post.activityDetails}></PostBox>
      </ListItem>
    ))

    return (
      <div className={classes.post}>
        <List>{listItems}</List>
      </div>
    )
  } else {
    return <Loading />
  }
}

PostScrollview.propTypes = {
  posts: PropTypes.array,
  viewer: PropTypes.object,
}
