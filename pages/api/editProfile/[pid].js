import { connectToDatabase } from '../../../utils/mongodb'
import microCors from 'micro-cors'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

const cors = microCors()

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  try {
    const {
      query: { pid },
    } = req

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

    const files = formData[1]
    const fields = formData[0]
    let icon = fields?.icon
    let banner = fields?.banner
    if (Object.keys(files).length !== 0) {
      if ('banner' in files) {
        const banner_url = await cloudinary.uploader.upload(files.banner.path, {
          width: 850,
          height: 500,
          crop: 'fill',
        })
        banner = banner_url.secure_url
      }

      if ('icon' in files) {
        const icon_url = await cloudinary.uploader.upload(files.icon.path, {
          width: 100,
          height: 100,
          crop: 'fill',
        })
        icon = icon_url.secure_url
      }
    }

    const user = await db.collection('users').updateOne(
      { nickname: `${pid.replace(/['"]+/g, '')}` },
      {
        $set: {
          name: fields.name,
          bio: fields.bio,
          profile_picture: icon,
          banner_picture: banner,
        },
      }
    )
    res.json(user)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
