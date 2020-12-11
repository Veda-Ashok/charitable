/* 
Delete: deletePost
Description: Allows a user to delete a post they have made. The reason we accept
a post _id is because if we were to implement this in the frontend it would 
make the most sense to send the specific id of the post, though you would be testing
this by endpoint since that would be a next semester feature. 
Function Parameters: post _id as a string
Return Value:
Query:
    db.posts.deleteOne(
        {_id: ObjectId('5fd3e9d75a10770008905f6f')}
    } 
*/
import { connectToDatabase } from '../../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  const {
    query: { pid },
  } = req

  try {
    const { db } = await connectToDatabase()

    const posts = await db.collection('posts').deleteOne({ _id: ObjectId(pid) })

    res.json(posts)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
