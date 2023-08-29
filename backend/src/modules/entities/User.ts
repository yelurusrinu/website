
import mongoose, { Document } from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "User",
  }
);

export interface IUser extends Document {
  email: string;
  otp: string;
  active:boolean;
}

const User = mongoose.model("User", UserSchema);

export default User;
