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
    maxWidth: '55rem',
    width: '100%',
  },
}))

export default function PostScrollview({ posts, viewer, refresh, setRefresh, getPosts }) {
  const classes = useStyles()
  if (posts) {
    const listItems = posts.map((post) => (
      <ListItem key={post._id}>
        <PostBox
          postId={post._id}
          editable={post.poster_docs[0].nickname === viewer.nickname}
          name={post.poster_docs[0].name}
          nickname={post.poster_docs[0].nickname}
          time={post.pretty_date}
          typedContent={post.typed_content}
          image={post.image}
          viewer={viewer}
          icon={post.poster_docs[0].profile_picture}
          refresh={refresh}
          setRefresh={setRefresh}
          getPosts={getPosts}
          orgDetails={post.attached_orgs_docs.length <= 0 ? null : post.attached_orgs_docs[0]}
          activityDetails={
            post.attached_activities_docs.length <= 0 ? null : post.attached_activities_docs[0]
          }></PostBox>
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
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  isProfile: PropTypes.bool,
  getPosts: PropTypes.any,
}
