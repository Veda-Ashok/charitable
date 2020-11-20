import { connectToDatabase } from '../../../utils/mongodb'
// const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db
    .collection('users')
    .find(
      {
        $or: [
          { name: { $regex: `${pid}`, $options: 'i' } },
          { nickname: { $regex: `${pid}`, $options: 'i' } },
          // { _id: ObjectId`${pid}` },
        ],
      },
      {
        _id: 1,
        email: 0,
      }
    )
    .limit(10)
    .toArray()

  res.json(users)
}
