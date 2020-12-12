import { connectToDatabase } from '../../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  try {
    const id = ObjectId(pid.replace(/['"]+/g, ''))
    const { db } = await connectToDatabase()

    const user = await db.collection('users').findOne(
      { _id: id },
      {
        projection: {
          _id: 0,
          saved_orgs: 1,
        },
      }
    )

    res.json(user)
  } catch (error) {
    console.error(error)
    res.json('IDK WTF TO PUT IN HEREEEEEE')
  }
}
