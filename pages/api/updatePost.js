/*
Update: UpdatePost
Description:
Function Parameters:
Return Value:
Query:

db.posts.updateOne(
    {_id: ObjectId('5fd3e9d75a10770008905f6f')},
    {$set: {
        typed_content: "hey guys"
    }
    }
)
*/

import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const updatedPosts = await db.collection('posts').updateOne(
      { _id: ObjectId(req.body.postId) },
      {
        $set: {
          typed_content: req.body.newContent,
        },
      }
    )

    res.json(updatedPosts)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
