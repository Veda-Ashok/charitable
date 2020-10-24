import React from 'react'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import { ListItem } from '@material-ui/core'
import PostBox from './Post'
import Loading from './Loading'

export default function PostScrollview({ posts }) {
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
        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <List>{listItems}</List>
        </div>
      </div>
    )
  } else {
    return <Loading />
  }
}

PostScrollview.propTypes = {
  posts: PropTypes.array,
}
