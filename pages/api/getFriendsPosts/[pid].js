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
        as: 'post_docs',
      },
    },
    {
      $unwind: {
        path: '$post_docs',
      },
    },
    {
      $lookup: {
        from: 'organizations',
        localField: 'post_docs.organization_id',
        foreignField: 'gg_id',
        as: 'attached_organizations',
      },
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'post_docs.activity_id',
        foreignField: '_id',
        as: 'attached_activities',
      },
    },
    { $project: { post_docs: 1, attached_organizations: 1, attached_activities: 1 } },
    {
      $set: {
        pretty_date: {
          $dateToString: { format: '%m-%d-%Y %H:%M', date: '$post_docs.date_posted' },
        },
      },
    },
    { $sort: { 'post_docs.date_posted': -1 } },
  ]

  // pipeline: [
  //   {
  //     $unwind: {
  //       path: '$friends_posts',
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: 'activities',
  //       localField: 'activity_id',
  //       foreignField: '_id',
  //       as: 'attached_activity',
  //     },
  //   },
  // ],
  // {
  //   $lookup: {
  //     from: 'organizations',
  //     localField: 'organization_id',
  //     foreignField: 'gg_id',
  //     as: 'attached_organization',
  //   },
  // },
  //   {
  //     $lookup: {
  //       from: 'activities',
  //       localField: 'activity_id',
  //       foreignField: '_id',
  //       as: 'attached_activity',
  //     },
  //   },
  const users = await db.collection('users').aggregate(agg)
  const result = await arrayFromCursor(users)
  res.json(result)
}
