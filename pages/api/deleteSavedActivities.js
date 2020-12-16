/*
Description: Remove the id of the activity that a use un-saves from their saved activities list.

Parameters: String representing ID of user, _id of activity that user wants to delete

Type: POST
*/
import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()

const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const users = await db
      .collection('users')
      .updateOne(
        { _id: ObjectId(req.body.userId) },
        { $pull: { saved_activities: ObjectId(req.body.result._id) } }
      )

    res.json(users)
  } catch (error) {
    console.error(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
