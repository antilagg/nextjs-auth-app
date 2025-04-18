import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'

type ResponseData = {
  success: boolean
  message?: string
  user?: {
    id: string
    username: string
    email: string
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
    const { user, email, pass } = req.body

    if (!user || !email || !pass) {
      return res.status(400).json({ success: false, message: 'missing required fields' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'invalid email format' })
    }

    if (pass.length < 6) {
      return res.status(400).json({ success: false, message: 'password must be at least 6 characters' })
    }

    // chek user and email separately (less efficient way 🫵)
    const userexists = await User.findOne({ username: user })
    const emailexists = await User.findOne({ email: email })

    if (userexists) {
      return res.status(409).json({ success: false, message: 'username already exists' })
    }

    if (emailexists) {
      return res.status(409).json({ success: false, message: 'email already in use' })
    }

    // uhq %10000000 protect hash
    const hashedPassword = await bcrypt.hash(pass, 10)

    const newUser = await User.create({
      username: user,
      email,
      password: hashedPassword
    })

    return res.status(201).json({
      success: true,
      message: 'reg success',
      user: {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    console.error('reg err:', error)
    return res.status(500).json({ success: false, message: 'internal server error' })
  }
}
