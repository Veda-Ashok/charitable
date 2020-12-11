// A natural language statement of a query(as you’ve done in previous assignments, but now in the code)
// Specification of all function parameters
// Specification of the return value
// At least one copy-pasteable example of the query, with specific values already provided

// Creation: CreatePost
// Description: This allows a user to create a post with a message that they desire.
// Function Parameters:
// Return Value:
// Query:
// db.posts.insertOne({
//     poster: 'krys',
//     image: null,
//     organization_id: null,
//     activity_id: null,
//     typed_content: 'found a new amazing opportunity! : )',
//     date_posted: new Date(),
// })

// User-readable search function:  returnUsersPosts
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

// Get-one-entity-by-ID:  GetPostById
// Description:
// Function Parameters:
// Return Value:
// Query:

// db.posts.findOne({
//     _id: ObjectId('5fc9eaeca2c42d0180bc202e')
// })

// Update: UpdatePost
// Description:
// Function Parameters:
// Return Value:
// Query:

// db.posts.updateOne(
//     {_id: ObjectId('5fc9eaeca2c42d0180bc202e')},
//     {$set: {
//         typed_content: "hey guys"
//     }
//     }
// )

// // Delete: DeletePost
// // Description: Allows a user to delete a post they have made.
// // Function Parameters:
// // Return Value:
// // Query:

//     db.posts.deleteOne(
//         {_id: ObjectId('5fc9eaeca2c42d0180bc202e')}
//     )

// // Start a session.
// session = db.getMongo().startSession( { readPreference: { mode: "primary" } } );

// activites_coll=session.getDatabase('charitable').activities;
// posts_coll=session.getDatabase('charitable').posts;
// users_coll=session.getDatabase('charitable').users;

// // Start a transaction
// session.startTransaction( { readConcern: { level: "local" }, writeConcern: { w: "majority" } } );

// // Operations inside the transaction
// try {
//   activites_coll.deleteOne(
//     {'_id': ObjectId('5fcd46926ebdb88aaec30632')}
//   );
//   posts_coll.deleteMany(
//     {'activity_id': ObjectId('5fcd46926ebdb88aaec30632')}
//   );
//   users_coll.update(
//     {},
//     { $pull: { saved_activities: ObjectId('5fcd46926ebdb88aaec30632')}},
//     {multi: true}
//   );
// } catch (error){
//   // Abort transaction on error
//   session.abortTransaction();
//   throw error;
// }
// // Commit the transaction using write concern set at transaction start
// session.commitTransaction();
// session.endSession();
