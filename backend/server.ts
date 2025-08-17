import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import orderRoutes from './routes/orders'
import menuRoutes from './routes/menus'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  console.log('Request Body:', req.body)
  next()
})

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/menus', menuRoutes)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(500).json({ message: 'Server error', error: err.message })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})