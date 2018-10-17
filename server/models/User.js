import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email is required!"]
  },
  password: {
    type: String,
    required: [true, "Password is required!"]
  },
  stripeId: {
    type: String
  },
  cclast4: {
    type: String
  },
  type: {
    type: String,
    default: "free-trials"
  }
});

export default mongoose.model("User", UserSchema);
