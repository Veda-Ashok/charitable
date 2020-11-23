import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const user = await db.collection('users').findOne(
    { nickname: `${pid.replace(/['"]+/g, '')}` },
    {
      _id: 1,
      email: 0,
    }
  )
  res.json(user)
}
