import { connectToDatabase } from '../../../utils/mongodb'
//adding comment

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()
  const organizations = await db
    .collection('organizations')
    .find(
      {
        name: { $regex: `${pid}`, $options: 'i' },
      },
      {
        _id: 0,
        name: 1,
        url: 1,
      }
    )
    .limit(1)
    .toArray()

  res.json(organizations)
}
