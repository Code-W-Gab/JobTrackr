import mongoose from "mongoose";
import { IUser } from "../types/auth.types";

const authSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  googleId: {
    type: String
  },
  avatar: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model<IUser>("User", authSchema)