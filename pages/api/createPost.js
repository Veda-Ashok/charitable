import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()
    const form = new formidable.IncomingForm()

    const formData = await new Promise(function (resolve, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err)
          return
        }
        resolve([fields, files])
      })
    })

    let photo = null
    const files = formData[1]
    const fields = formData[0]
    if (Object.keys(files).length !== 0) {
      const image = await cloudinary.uploader.upload(files.image.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      })
      photo = image.secure_url
    }

    const activity_id = fields.activity_id === 'null' ? null : ObjectId(fields.activity_id)
    const post = await db.collection('posts').insertOne({
      poster: fields.poster,
      image: photo === 'null' ? null : photo,
      organization_id: fields.organization_id === 'null' ? null : fields.organization_id,
      activity_id: activity_id,
      typed_content: fields.typed_content,
      date_posted: new Date(),
    })
    res.json(post)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
