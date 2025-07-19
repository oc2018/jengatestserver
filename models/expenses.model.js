import mongoose from "mongoose";
import { Counter } from "./txn.model.js";

const expenseSchema = new mongoose.Schema(
  {
    pettyCashNo: {
      type: Number,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "pettyCashNo" },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.pettyCashNo = counter.seq;
  }

  next();
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
