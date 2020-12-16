/*
Description: Add the id of the activity that a user saves to their saved activities list.

Parameters: String representing ID of user, _id of activity user wants to save

Type: POST
*/
import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    if (!req.body.userId) {
      throw new Error('No user id provided.')
    }

    if (!req.body.result._id) {
      throw new Error('No activity id provided.')
    }

    const id = ObjectId(req.body.userId)

    const saved_activity_id = ObjectId(req.body.result._id)

    const users = await db
      .collection('users')
      .updateOne({ _id: id }, { $addToSet: { saved_activities: saved_activity_id } })

    res.json(users)
  } catch (error) {
    console.error(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
