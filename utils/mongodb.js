import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (!dbName) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local')
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

/*
Example import is:
const { db } = await connectToDatabase()
  const users = await db.collection('users').find({}).limit(5).toArray()
  //$lt less than,
  const orgs = await db
    .collection('organization')
    .find(
      {
        $and: [{ name: /love/i }, { mission: /love/i }],
      },
      {
        _id: 0,
        gg_id: 1,
        name: 1,
      }
    )
    .limit(1)
    .sort({ name: 1 })
    .limit(10)
    .toArray()
*/
