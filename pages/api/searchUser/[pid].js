import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db
    .collection('users')
    .find(
      {
        nickname: { $regex: `${pid}`, $options: 'i' },
      },
      {
        _id: 0,
        email: 0,
      }
    )
    .limit(10)
    .toArray()

  res.json(users)
}
