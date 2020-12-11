import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const user = await db
    .collection('users')
    .findOne(
      { nickname: `${pid.replace(/['"]+/g, '')}` },
      { projection: { email: 0, password: 0 } }
    )

  res.json(user)
}
