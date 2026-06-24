import mongoose from "mongoose";
import { IUser } from "../types/authTypes";

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
  }
}, { timestamps: true })

export default mongoose.model<IUser>("User", authSchema)