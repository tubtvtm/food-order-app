import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  try {
    const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/food-order?authSource=admin`

    const conn = await mongoose.connect(uri)
    console.log(' เชื่อมต่อ MongoDB สำเร็จที่:', conn.connection.name)
    return conn
  } catch (error: any) {
    console.error(' MongoDB connection error:', error.message)
    process.exit(1)
  }
}


export default connectDB