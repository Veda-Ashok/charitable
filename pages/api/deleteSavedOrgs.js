import { connectToDatabase } from '../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const users = await db
      .collection('users')
      .updateOne(
        { _id: ObjectId(req.body.userId) },
        { $pull: { saved_orgs: req.body.result.gg_id } },
        { upsert: true }
      )

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
