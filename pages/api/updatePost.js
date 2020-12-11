/*
Update: UpdatePost

Description: Allows user to update the typed content of a post. For testing 
the api call in postman by selecting Body then x-www-form-urlencoded with the keys as postId, and 
newContent then the value for newContent is the string you want to be the new
text and the value of the postId is the id of the post as a string. 

Function Parameters: String(postId), String(newContent)

Return Value: JSON Object: nModified field indicates if modification succeeded

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
