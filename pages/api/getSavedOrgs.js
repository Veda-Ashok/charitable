import { connectToDatabase } from '../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const users = await db.collection('users').findOne(
      { _id: ObjectId('5fb3675e723a2200111c8a08') },
      {
        _id: 0,
        saved_orgs: 1,
      }
    )

    res.json(users.saved_orgs)
  } catch (error) {
    console.error(error)
  }
}
