import mongoose from "mongoose";

const ProprtiesSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    rent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", ProprtiesSchema);

export default Property;
