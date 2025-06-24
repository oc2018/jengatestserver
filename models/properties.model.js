import mongoose from "mongoose";

export const PropertyStatus = Object.freeze({
  AVAILABLE: "Available",
  OCCUPIED: "Occupied",
  MAINTENANCE: "Maintenance",
  PENDING: "Pending",
});

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
    deposit: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(PropertyStatus),
      default: PropertyStatus.AVAILABLE,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", ProprtiesSchema);

export default Property;
