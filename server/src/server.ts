import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import applicationRoutes from './routes/application.routes';
dotenv.config();

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/application', applicationRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})