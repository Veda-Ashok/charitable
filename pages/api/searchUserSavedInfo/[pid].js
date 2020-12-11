import { connectToDatabase } from '../../../utils/mongodb'

const arrayFromCursor = async (cursor) => {
  //  cursor.forEach is asynchronous!
  const result = []
  await cursor.forEach((item) => result.push(item))
  return result
}

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const agg = [
    {
      $match: {
        nickname: `${pid.replace(/['"]+/g, '')}`,
      },
    },
    {
      $lookup: {
        from: 'organizations',
        localField: 'saved_orgs',
        foreignField: 'gg_id',
        as: 'saved_orgs_docs',
      },
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'saved_activities',
        foreignField: '_id',
        as: 'saved_activities_docs',
      },
    },
    {
      $project: {
        _id: 0,
        password: 0,
      },
    },
  ]

  const users = await db.collection('users').aggregate(agg)
  const result = await arrayFromCursor(users)
  res.json(result[0])
}
