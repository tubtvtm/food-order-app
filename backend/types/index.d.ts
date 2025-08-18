// src/types/express/index.d.ts
import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string
      role: string
    }
  }
}
