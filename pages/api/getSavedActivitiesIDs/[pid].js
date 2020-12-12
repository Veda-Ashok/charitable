import { connectToDatabase } from '../../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  try {
    const { db } = await connectToDatabase()

    const users = await db.collection('users').findOne(
      { _id: ObjectId(pid.replace(/['"]+/g, '')) },
      {
        projection: {
          _id: 0,
          saved_activities: 1,
        },
      }
    )

    res.json(users ? users.saved_activities : [])
  } catch (error) {
    console.error(error)
  }
}
