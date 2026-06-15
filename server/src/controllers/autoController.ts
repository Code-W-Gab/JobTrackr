import authSchema from "../models/authSchema";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const authController = {
  async Register (req: Request<{}, {}, IUser>, res: Response) {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(404).json({ errors: errors.array() })
        
      const { fullName, email, password, confirmPassword } = req.body;
      const userExists = await authSchema.findOne({ email });

      if(userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      if(password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hashed Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await authSchema.create({
        fullName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword
      })

      res.status(201).json({
        success: true,
        data: newUser,
        message: "User registered successfully"
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error"
      })
    }
  }
}

export default authController