import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

// This was implemented assuming that res is the object of the
// user being unfollowed and req is the object of the user doing
// the unfollowing.

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const users = await db
      .collection('users')
      .updateOne({ _id: ObjectId(res.body.userId) }, { $pull: { following: req.body.result._id } })

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
export default cors(handler)