import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import PostBox from './Post'

export default function PostScrollview({ posts }) {
  console.log('HELLLLOOOO')
  console.log('component posts:', posts)
  if (posts) {
    const listItems = posts.map((post) => (
      <ListItem key={post.name}>
        <PostBox
          name={post.name}
          icon={post.icon}
          time={post.time}
          typedContent={post.typedContent}
          image={post.image}
          orgDetails={post.orgDetails}
          activityDetails={post.activityDetails}></PostBox>
      </ListItem>
    ))

    return (
      <div>
        <Paper style={{ maxHeight: 2000, overflow: 'auto' }}>
          <List>{listItems}</List>
        </Paper>
      </div>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

PostScrollview.propTypes = {
  posts: PropTypes.array,
}
