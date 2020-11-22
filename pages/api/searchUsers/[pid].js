import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db.collection('users').find({}).limit(1).toArray()

  res.json(users)
}
