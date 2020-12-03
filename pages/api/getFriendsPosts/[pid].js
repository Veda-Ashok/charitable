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
        from: 'posts',
        localField: 'following',
        foreignField: 'poster',
        as: 'friends_posts',
        pipeline: [
          {
            $lookup: {
              from: 'activities',
              localField: 'activity_id',
              foreignField: '_id',
              as: 'attached_activity',
            },
          },
          {
            $lookup: {
              from: 'organizations',
              localField: 'organization_id',
              foreignField: 'gg_id',
              as: 'attached_organization',
            },
          },
        ],
      },
    },
  ]

  const users = await db.collection('users').aggregate(agg)
  const result = await arrayFromCursor(users)
  res.json(result[0])
}
