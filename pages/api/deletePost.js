/* 
Delete: deletePost

Description: Allows a user to delete a post they have made. We accept post _id to 
ensure we are deleting a unique post. 

You can also test in Postman!
Using the endpoint: https://charitable.vercel.app/api/deletePost
Select Body, then select x-www-form-urlencoded, and make the key postId. The value of postId is the _id of the post 
you want to delete. For example, to delete one of Sam's posts: 

postId: 5fd94ef7d6cd09c8567372cc

You can also test this by going through our front-end on either timeline or profile page, 
then clicking the 'x' on your own posts. : )

Function Parameters: post _id as a string

Return Value: JSON Object: nModified field indicates if deletion succeeded

Query:
    db.posts.deleteOne(
        {_id: ObjectId('5fda9bede08cc90008fb1568')});
*/

import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()
    if (!req.body.postId) {
      throw new Error('No ID provided.')
    }
    const id = ObjectId(req.body.postId)
    const posts = await db.collection('posts').deleteOne({ _id: id })
    res.json(posts)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
