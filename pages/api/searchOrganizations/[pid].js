import { connectToDatabase } from '../../../utils/mongodb'

//http://localhost:3000/api/searchOrganizations/Uganda

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()
  const organizations = await db
    .collection('organizations')
    .find(
      {
        $or: [
          { name: { $regex: `${pid}`, $options: 'i' } },
          { themes: { $regex: `${pid}`, $options: 'i' } },
          { countries: { $regex: `${pid}`, $options: 'i' } },
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

  res.json(organizations)
}
