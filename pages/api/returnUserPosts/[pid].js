// User-readable search function:  SearchPost
// Description: Query to search for posts by nickname
// Function Parameters: Nickname(String)
// Return Value: Array of posts made by user
// Query:
// db.posts.aggregate([
//     {$match: {
//         poster: 'krys',
//     },
//     },
//     {$lookup: {
//         from: 'organizations',
//         localField: 'organization_id',
//         foreignField: 'gg_id',
//         as: 'attached_orgs_docs',
//     },
//     },
//     {$lookup: {
//         from: 'activities',
//         localField: 'activity_id',
//         foreignField: '_id',
//         as: 'attached_activities_docs',
//     },
//     },
//     {$lookup: {
//         from: 'users',
//         localField: 'poster',
//         foreignField: 'nickname',
//         as: 'poster_docs',
//     },
//     },
//     {$set: {
//         pretty_date: {$dateToString: {format: '%m-%d-%Y %H:%M', date: '$date_posted'}},
//     },
//     },
//     {$sort: {date_posted: -1}
//      }
// ])
