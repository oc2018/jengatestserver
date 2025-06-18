import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, trim: true },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be atleast 8 characters long"],
    },
    confirmPassword: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },
  },
  {
    timestamps: true,
  }
);

const UserDetails = mongoose.model("UserDetails", UserSchema);

export default UserDetails;
