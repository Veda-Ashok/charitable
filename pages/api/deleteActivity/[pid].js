/*
Transaction: deleteActivity

Description: If an activity is ever deleted, this query will subsequently delete any posts made about the deleted activity, 
and it will also remove the activity from a user's Saved Activities if they had saved it.

To test in Mongo Shell, run this:
session = db.getMongo().startSession( { readPreference: { mode: "primary" } } );
 
activites_coll=session.getDatabase('charitable').activities;
posts_coll=session.getDatabase('charitable').posts;
users_coll=session.getDatabase('charitable').users;

session.startTransaction( { readConcern: { level: "local" }, writeConcern: { w: "majority" } } );

try {
  activites_coll.deleteOne(
    {'_id': ObjectId('5fd4150d588839e26a2d6fe3')}
  );
  posts_coll.deleteMany(
    {'activity_id': ObjectId('5fd4150d588839e26a2d6fe3')}
  );
  users_coll.update(
    {},
    { $pull: { saved_activities: ObjectId('5fd4150d588839e26a2d6fe3')}},
    {multi: true}
  );
} catch (error){
  // Abort transaction on error
  session.abortTransaction();
  throw error;
}
session.commitTransaction();
session.endSession();
*/

// 5fd41347466167d5dfd6dbec
// 5fd41355466167d5dfd6dbed

import { MongoClient } from 'mongodb'

import microCors from 'micro-cors'

const cors = microCors()

const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const {
      query: { pid },
    } = req

    const { MONGODB_URI, MONGODB_DB } = process.env

    if (!MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
    }

    if (!MONGODB_DB) {
      throw new Error('Please define the MONGODB_DB environment variable inside .env.local')
    }
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    const client = MongoClient(MONGODB_URI, opts)
    await client.connect()

    const session = client.startSession()

    const transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'local' },
      writeConcern: { w: 'majority' },
    }

    let activityResult
    let postResult
    let userResult

    // if (!req.body.postId) {
    //   throw new Error('No ID provided.')
    // }

    const id = ObjectId(pid)
    const isValidActivityId =
      (await client.db('charitable').collection('activity').find({ _id: id }).count()) > 0

    if (!isValidActivityId) {
      throw new Error('Invalid activity id')
    }

    try {
      await session.withTransaction(async () => {
        const activites_coll = client.db('charitable').collection('activities')
        const posts_coll = client.db('charitable').collection('posts')
        const users_coll = client.db('charitable').collection('users')

        activityResult = await activites_coll.deleteOne({ _id: ObjectId(pid) }, { session })
        postResult = await posts_coll.deleteMany({ activity_id: ObjectId(pid) }, { session })
        userResult = await users_coll.updateMany(
          {},
          { $pull: { saved_activities: ObjectId(pid) } },
          { session }
        )
      }, transactionOptions)
    } finally {
      await session.endSession()
      await client.close()
      res.json({ activity: activityResult, post: postResult, user: userResult })
    }
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
