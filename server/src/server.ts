import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import { Request, Response } from 'express';

const app = express();

app.use(express.json())
app.use(cors({
  credentials: true
}))

connectDB()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})