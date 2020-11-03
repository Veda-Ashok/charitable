// function remove(id, callback) {
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

//     users.remove({ email: id }, function (err) {
//       client.close()

//       if (err) return callback(err)
//       callback(null)
//     })
//   })
// }
