import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({
      email,
      password,
      name,
    })

    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id.toString())
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating user', error: error.message })
    } else {
      res.status(500).json({ message: 'Error creating user', error: 'Unknown error' })
    }
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id.toString())
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Login error', error: error.message })
    } else {
      res.status(500).json({ message: 'Login error', error: 'Unknown error' })
    }
  }
})

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  })
}

export default router
