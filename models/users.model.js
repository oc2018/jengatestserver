import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
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
    avatarUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 12);
    this.setUpdate(update);
  }
});

const UserDetails = mongoose.model("UserDetails", UserSchema);

export default UserDetails;
12;
