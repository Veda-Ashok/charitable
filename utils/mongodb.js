import { MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
let cached = global.mongo
if (!cached) cached = global.mongo = {}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    const conn = {}
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        conn.client = client
        return client.db(MONGODB_DB)
      })
      .then((db) => {
        conn.db = db
        cached.conn = conn
      })
  }
  await cached.promise
  return cached.conn
}

export const arrayFromCursor = async (cursor) => {
  const result = []
  await cursor.forEach((item) => result.push(item))
  return result
}

/* 
In our front end if the user didn't attach an activity_id or organization_id, we pass in null.
*/
export async function checkInputs(activity_id, organization_id, user_nickname, files, db) {
  const doesActivityExist =
    (await db.collection('activities').find({ _id: activity_id }).count()) > 0 ||
    activity_id === null
  const doesOrganizationExist =
    (await db.collection('organizations').find({ gg_id: organization_id }).count()) > 0 ||
    organization_id === null
  const doesUserNicknameExist =
    (await db.collection('users').find({ nickname: user_nickname }).count()) > 0
  if (!doesActivityExist) {
    throw new Error('Invalid Activity')
  }
  if (!doesOrganizationExist) {
    throw new Error('Invalid Organization')
  }
  if (!doesUserNicknameExist) {
    throw new Error('Invalid User Nickname')
  }
  const validImageTypes = new Set(['image/png', 'image/jpg', 'image/jpeg', null])
  if (Object.keys(files).length !== 0) {
    if (!validImageTypes.has(files.image.type)) {
      throw new Error('Invalid Image Type')
    }
  }
}
