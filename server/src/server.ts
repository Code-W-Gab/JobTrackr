import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World Baby!');
})
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})