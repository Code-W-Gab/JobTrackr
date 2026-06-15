import mongoose from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
  confirmPassword: {
    type: String
  }
}, { timestamps: true })

export default mongoose.model("User", authSchema)