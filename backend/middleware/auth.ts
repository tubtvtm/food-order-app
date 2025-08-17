import { Request, Response, NextFunction } from 'express'

// Middleware สำหรับตรวจสอบว่า user login แล้ว
export const protect = (req: Request, res: Response, next: NextFunction) => {
  // จำลอง user ที่ login แล้วแนบไว้ที่ req.user
  req.user = {
    id: 'dummy-user-id',
    role: 'admin' // เปลี่ยนเป็น 'user' ได้หากต้องการทดสอบสิทธิ์
  }
  next()
}

// Middleware สำหรับตรวจสอบสิทธิ์ admin
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied: Admin only' })
  }
}
