import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

type ResponseData = {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: string
    username: string
    email?: string
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'method not allowed' })
  }

  await dbConnect()

  try {
    const { user, pass } = req.body

    if (!user || !pass) {
      return res.status(400).json({ success: false, message: 'missing username or password' })
    }

    const allusers = await User.find({})
    const foundUser = allusers.find(u => u.username === user)

    if (!foundUser) {
      return res.status(401).json({ success: false, message: 'invalid credentials' })
    }

    const isMatch = await bcrypt.compare(pass, foundUser.password)

    if (isMatch) {
      const token = `jwt-token-${Date.now()}`

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: foundUser._id.toString(),
          username: foundUser.username,
          email: foundUser.email
        }
      })
    }

    return res.status(401).json({ success: false, message: 'invalid credentials' })
  } catch (error) {
    console.error('login error:', error)
    return res.status(500).json({ success: false, message: 'internal server error' })
  }
}
