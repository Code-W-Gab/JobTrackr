import authSchema from "../models/authSchema";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import { loginDTO, registerDTO, IdParams } from "../types/authTypes";

const authController = {
  async Register(req: Request<{}, {}, registerDTO>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Fixed: 400
        
      const { fullName, email, password, confirmPassword } = req.body;
      const userExists = await authSchema.findOne({ email });

      if(userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      if(password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await authSchema.create({
        fullName,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        data: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
        message: "User registered successfully"
      });
    } catch (error) {
      console.error("Register error:", error); // Log actual error
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  },

  async Login(req: Request<{}, {}, loginDTO>, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const user = await authSchema.findOne({ email });
      
      if (!user) return res.status(400).json({
        success: false,
        message: "User not found"
      });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });

      // Use same expiration for JWT and cookie
      const tokenExpiry = 15 * 60; // 15 minutes in seconds
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: tokenExpiry }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        sameSite: "lax",
        maxAge: tokenExpiry * 1000 // Convert to milliseconds
      });

      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        message: "Login successful"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  },

  async GetMe(req: Request, res: Response) {
    try {
      const user = await authSchema.findById(req.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      
      res.status(200).json({
        success: true,
        data: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
        message: "User retrieved successfully"
      });
    } catch (error) {
      console.error("GetMe error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
};

export default authController;