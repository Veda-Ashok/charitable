/*
Description: Add the id of the organization that a user saves to their saved organizations list.

Parameters: String representing ID of user, _id of organization that user wants to add

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

    if (!req.body.result.gg_id) {
      throw new Error('No org id provided.')
    }

    const id = ObjectId(req.body.userId)

    const users = await db
      .collection('users')
      .updateOne({ _id: id }, { $addToSet: { saved_orgs: req.body.result.gg_id } })

    res.json(users)
  } catch (error) {
    console.error(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}
export default cors(handler)
