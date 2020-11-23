import { connectToDatabase } from '../../../utils/mongodb'
// const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db.collection('users').findOne(
    { nickname: `${pid.replace(/['"]+/g, '')}` },
    {
      _id: 1,
      email: 0,
    }
  )

  res.json(users)
}
