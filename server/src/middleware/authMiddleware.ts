import jwt from 'jsonwebtoken';
import { 
  Response, 
  Request, 
  NextFunction 
} from 'express';

export interface AuthRequest
  extends Request {
  userId?: string;
}

export const protect = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({
      message: "Not authorized"
    })

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET!
    ) as {
      id: string;
    };

    req.userId = decoded.id
    
    next()
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    })
  }
}
