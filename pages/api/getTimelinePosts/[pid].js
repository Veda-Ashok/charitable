// Query  # 1: getTimelinePosts
// Description: Query to search for the current user by nickname and get all of the posts that user
// has made as well as those made by the people they are following.
// Function Parameters: string: user nickname
// Return Value: post_docs: Array of post objects, attached_orgs_docs: array of organization objects, attached_activities_docs: array of activity objects, and poster_docs: an array of user objects
// Query:
// db.users.aggregate([{$match: {
//     nickname: 'krys',
// },
// },
//     {$lookup: {
//         from: 'posts',
//         localField: 'following',
//         foreignField: 'poster',
//         as: 'friends_docs',
//     },
// },
//     {$lookup: {
//         from: 'posts',
//         localField: 'nickname',
//         foreignField: 'poster',
//         as: 'my_docs',
//     },
// },
//     {$project: {
//         post_docs: {$setUnion: ['$my_docs', '$friends_docs'],
//                     },
//     },
// },
//     {$unwind: {
//         path: '$post_docs',
//     },
// },
//     {$lookup: {
//         from: 'organizations',
//         localField: 'post_docs.organization_id',
//         foreignField: 'gg_id',
//         as: 'attached_orgs_docs',
//     },
// },
//     {$lookup: {
//         from: 'activities',
//         localField: 'post_docs.activity_id',
//         foreignField: '_id',
//         as: 'attached_activities_docs',
//     },
// },
//     {$lookup: {
//         from: 'users',
//         localField: 'post_docs.poster',
//         foreignField: 'nickname',
//         as: 'poster_docs',
//     },
// },
//     {$project: {
//         post_docs: 1,
//         attached_orgs_docs: 1,
//         attached_activities_docs: 1,
//         poster_docs: 1,
//     },
// },
//     {$set: {
//         pretty_date: {$dateToString: {format: '%m-%d-%Y %H:%M', date: '$post_docs.date_posted'},
//                       },
//     },
// },
//     {$sort: {'post_docs.date_posted': -1}},
// ])

import { connectToDatabase } from '../../../utils/mongodb'

const arrayFromCursor = async (cursor) => {
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
        as: 'friends_docs',
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: 'nickname',
        foreignField: 'poster',
        as: 'my_docs',
      },
    },
    {
      $project: {
        post_docs: {
          $setUnion: ['$my_docs', '$friends_docs'],
        },
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
        as: 'attached_orgs_docs',
      },
    },
    {
      $lookup: {
        from: 'activities',
        localField: 'post_docs.activity_id',
        foreignField: '_id',
        as: 'attached_activities_docs',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'post_docs.poster',
        foreignField: 'nickname',
        as: 'poster_docs',
      },
    },
    {
      $project: {
        post_docs: 1,
        attached_orgs_docs: 1,
        attached_activities_docs: 1,
        poster_docs: 1,
      },
    },
    {
      $set: {
        pretty_date: {
          $dateToString: { format: '%m-%d-%Y %H:%M', date: '$post_docs.date_posted' },
        },
      },
    },
    { $sort: { 'post_docs.date_posted': -1 } },
  ]
  const users = await db.collection('users').aggregate(agg)
  const result = await arrayFromCursor(users)
  res.json(result)
}
