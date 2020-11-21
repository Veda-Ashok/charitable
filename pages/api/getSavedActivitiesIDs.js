import { connectToDatabase } from '../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const users = await db.collection('users').findOne(
      { _id: ObjectId('5fb3675e723a2200111c8a08') },
      {
        _id: 0,
        saved_activities: 1,
      }
    )

    res.json(users.saved_activities)
  } catch (error) {
    console.error(error)
  }
}
