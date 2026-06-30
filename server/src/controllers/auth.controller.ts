import authSchema from "../models/auth.schema";
import { RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import { IUpdatePass, loginDTO, registerDTO, updateMeDTO } from "../types/auth.types";

export const Register: RequestHandler<{}, {}, registerDTO> = async (req, res) => {
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
}

export const Login: RequestHandler<{}, {}, loginDTO> = async (req, res ) => {
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
}

export const GetMe: RequestHandler = async (req, res) => {
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

export const UpdateMe: RequestHandler<{}, {}, updateMeDTO> = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }); // Fixed: 400
      
    const me = await authSchema.findByIdAndUpdate(
      req.userId,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );

    if(!me) return res.status(404).json({ message: "User not found"})

    res.status(200).json({
      success: true,
      data: {
        fullName: me.fullName
      },
      message: "User updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const Logout: RequestHandler = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const UpdatePassword: RequestHandler<{}, {}, IUpdatePass> = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { currentPassword, newPassword, confirmNewPassword } = req.body
    const user = await authSchema.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({
      success: false,
      message: "Invalid Credentials"
    });

    if(newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const me = await authSchema.findByIdAndUpdate(
      req.userId,
      { password: hashedPassword },
      { returnDocument: 'after', runValidators: true }
    );

    if(!me) return res.status(404).json({ message: "User not found"})

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      message: "Password Update successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export const DeleteAccount: RequestHandler = async (req, res) => {
  try {
    const user = await authSchema.findByIdAndDelete(req.userId)

    if(!user) return res.status(404).json({ message: "User not found"})
    
    res.status(201).json({
      success: true,
      message: "User deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// export const forgotPassword: RequestHandler = async (req, res) => {
//   try {
//     const { email } = req.body
//     const user = await authSchema.findOne({email})

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error"
//     });
//   }
// }

export default {
  Register,
  Login,
  GetMe,
  UpdateMe,
  Logout,
  UpdatePassword
};