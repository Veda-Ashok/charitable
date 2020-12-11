import { connectToDatabase } from '../../../utils/mongodb'
// const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db
    .collection('users')
    .find({ name: { $regex: `${pid}`, $options: 'i' } })
    .project({ email: 0, password: 0 })
    .limit(20)
    .toArray()

  res.json(users)
}
