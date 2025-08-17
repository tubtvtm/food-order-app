import express from 'express'
import Order from '../models/Order'
import { protect } from '../middleware/auth'

const router = express.Router()

// Create order
router.post('/', async (req, res) => {
  try {
    console.log('Received order:', req.body)

    const { items, totalPrice, userId } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order items' })
    }

    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
      status: 'pending'
    })

    console.log('Created order:', order)
    res.status(201).json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error creating order', error: error.message })
    } else {
      res.status(500).json({ message: 'Error creating order', error: 'Unknown error' })
    }
  }
})

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message })
    } else {
      res.status(500).json({ message: 'Error fetching orders', error: 'Unknown error' })
    }
  }
})

export default router
