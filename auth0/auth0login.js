// function login(email, password, callback) {
//   const bcrypt = require('bcrypt')
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

//     users.findOne({ $or: [{ email: email }, { username: email }] }, function (err, user) {
//       if (err || !user) {
//         client.close()
//         return callback(err || new WrongUsernameOrPasswordError(email))
//       }

//       bcrypt.compare(password, user.password, function (err, isValid) {
//         client.close()

//         if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email))

//         return callback(null, {
//           user_id: user._id.toString(),
//           nickname: user.nickname,
//           email: user.email,
//         })
//       })
//     })
//   })
// }
