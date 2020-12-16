/*
Description: Add the nicknames of the users that a user wants to follow.

Parameters: String representing ID of follower, nickname of the following

Type: POST

This was implemented assuming that res is the object of the
user being followed and req is the object of the user doing
the following.
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

    if (!req.body.result.nickname) {
      throw new Error('No follow nickname provided.')
    }

    const id = ObjectId(req.body.userId)

    const users = await db
      .collection('users')
      .updateOne({ _id: id }, { $addToSet: { following: req.body.result.nickname } })

    res.json(users)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}
export default cors(handler)
