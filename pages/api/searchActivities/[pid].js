import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()
  const activities = await db
    .collection('activities')
    .find(
      {
        $or: [
          { title: { $regex: `${pid}`, $options: 'i' } },
          { country: { $regex: `${pid}`, $options: 'i' } },
          { theme: { $regex: `${pid}`, $options: 'i' } },
        ],
      },
      {
        _id: 0,
        name: 1,
        url: 1,
      }
    )
    .limit(20)
    .toArray()

  res.json(activities)
}
