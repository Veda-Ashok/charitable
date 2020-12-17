/*
Description: Search call for organizations; returns organization search results that match query to organization name, 
theme, and country.

Parameters: String: string that specifies either an organization name, theme, or country.

Type: GET
*/
import { connectToDatabase } from '../../../utils/mongodb'

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
