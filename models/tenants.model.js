import mongoose from "mongoose";
import validator from "validator";

const TenantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    idNumber: Number,
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isMobilePhone, "Enter a valid PhoneNumber"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
      validate: [validator.isEmail, "Enter a valid email"],
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tenant = mongoose.model("Tenant", TenantSchema);

export default Tenant;
