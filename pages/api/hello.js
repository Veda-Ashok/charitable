// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Organization } from '../../utils/database'

export default async (req, res) => {
  const org = await Organization.findOne()
  res.statusCode = 200
  res.json({ name: org.get('name'), description: org.get('description') })
}
