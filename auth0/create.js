// function create(user, callback) {
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

//     const nonAlphanumeric = new RegExp(/\W/g)
//     //if there's a weird character, throw error
//     if (nonAlphanumeric.test(user.username)) {
//       client.close()
//       return callback(new Error('No special characters'))
//     }

//     users.findOne({ email: user.username }, function (err, withSameMail) {
//       if (err || withSameMail) {
//         client.close()
//         return callback(err || new Error('do not use email as username'))
//       }
//     })

//     users.findOne({ username: user.email }, function (err, withSameMail) {
//       if (err || withSameMail) {
//         client.close()
//         return callback(
//           err || new Error('email is taken as a username, please use a different one')
//         )
//       }
//     })

//     users.findOne({ $or: [{ email: user.email }, { username: user.username }] }, function (
//       err,
//       withSameMail
//     ) {
//       if (err || withSameMail) {
//         client.close()
//         return callback(err || new Error('the user already exists'))
//       }

//       bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//           client.close()
//           return callback(err)
//         }

//         user.password = hash
//         user.email_verified = false
//         user.name = 'Please add your name'
//         user.profile_picture = '/media/default_prof_pic.png'
//         user.banner_picture = '/media/default_banner_pic.png'
//         user.bio = 'Please add your own bio'
//         user.saved_orgs = []
//         user.saved_activities = []
//         user.following = []
//         user.nickname = user.username

//         users.insert(user, function (err, inserted) {
//           client.close()

//           if (err) return callback(err)
//           callback(null)
//         })
//       })
//     })
//   })
// }
