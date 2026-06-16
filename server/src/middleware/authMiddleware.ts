import jwt from 'jsonwebtoken';
import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
      message: "Not authorized"
    })

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as { id: string };

    req.userId = decoded.id
    
    next()
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    })
  }
}
