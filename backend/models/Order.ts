// filepath: backend/models/Order.ts
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  items: [{
    name: String,
    quantity: Number,
    price: Number,
    options: Object,
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
})

export default mongoose.model('Order', orderSchema)