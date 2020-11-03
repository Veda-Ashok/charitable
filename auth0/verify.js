// function verify(email, callback) {
//   const MongoClient = require('mongodb@3.1.4').MongoClient
//   const client = new MongoClient(
//     'mongodb+srv://user:' +
//       configuration.MONGO_PASSWORD +
//       '@charitable.ddnxi.mongodb.net/?retryWrites=true&w=majority'
//   )

//   client.connect(function (err) {
//     if (err) return callback(err)

//     const db = client.db('charitable')
//     const users = db.collection('users')
//     const query = { email: email, email_verified: false }

//     users.updateOne(query, { $set: { email_verified: true } }, function (err, count) {
//       if (err) return callback(err)
//       if (count.modifiedCount !== 1) return callback('Unable to mark user as verified.')

//       callback(null, true)
//       client.close()
//     })
//   })
// }
