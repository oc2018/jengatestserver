import mongoose from "mongoose";

export const txnAccountType = Object.freeze({
  DEPOSIT_PAID: "deposit_paid",
  RENT: "rent",
  REFUND: "refund",
  FINE: "fine",
  RENT_PAID: "rent_paid",
});

export const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model("Counter", counterSchema);

const txnSchema = new mongoose.Schema(
  {
    txnID: {
      type: Number,
      unique: true,
    },
    accountType: {
      type: String,
      enum: Object.values(txnAccountType),
      default: txnAccountType.RENT,
    },
    amount: {
      type: Number,
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    isDebit: {
      type: Boolean,
      required: true,
    },
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  },
  {
    timestamps: true,
  }
);

txnSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "txnID" },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );
    this.txnID = counter.seq;
  }
  next();
});

const Txn = mongoose.model("Transaction", txnSchema);
export default Txn;
