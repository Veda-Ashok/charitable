/*
Update: updatePost

Description: Allows user to update the typed content of a post. 

You can also test in Postman!
Using the endpoint: https://charitable.vercel.app/api/updatePost
Select Body, and select x-www-form-urlencoded. Enter the keys as postId and 
newContent. The value for newContent is the string you want to be the new text and the value of the postId is the id of the 
post as a string.

Example:
Test in PostMan by by hitting the endpoint with the following body: 
key: postId, value: 5fd95ad9d6cd09c8567372d3

Function Parameters: String: postId, String: newContent

Return Value: JSON Object: nModified field indicates if modification succeeded

Query:
db.posts.updateOne(
    {_id: ObjectId('5fd3e9d75a10770008905f6f')},
    {$set: {
        typed_content: "does this update? : )"
    }
    }
);
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
    const isValidPostId = (await db.collection('posts').find({ _id: id }).count()) > 0
    const isValidNewContent =
      req.body.newContent !== undefined &&
      req.body.newContent !== null &&
      req.body.newContent !== ''

    if (!isValidPostId) {
      throw new Error('Invalid post id')
    }

    if (!isValidNewContent) {
      throw new Error('New content is invalid')
    }

    const updatedPosts = await db.collection('posts').updateOne(
      { _id: id },
      {
        $set: {
          typed_content: req.body.newContent,
        },
      }
    )

    res.json(updatedPosts)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
