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
        { $addToSet: { following: req.body.result._id } }
      )

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
export default cors(handler)
