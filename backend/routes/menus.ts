import express from 'express'
import Menu from '../models/Menu'
import { protect, admin } from '../middleware/auth'

const router = express.Router()

// Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find({ available: true })
    res.json(menus)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Create menu (admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const menu = await Menu.create(req.body)
    res.status(201).json(menu)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Update menu (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(menu)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router

