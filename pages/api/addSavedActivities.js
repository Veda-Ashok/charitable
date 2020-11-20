import { connectToDatabase } from '../../utils/mongodb'

const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  // const {
  //   query: { pid },
  // } = req
  try {
    const example = {
      _id: ObjectId('5fb3675e723a2200111c8a08'),
      activityId: 'checking',
      wantToSave: false,
    }

    const { db } = await connectToDatabase()

    const users = await db
      .collection('users')
      .updateOne(
        { _id: example._id },
        { $addToSet: { saved_activities: example.activityId } },
        { upsert: true }
      )

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
