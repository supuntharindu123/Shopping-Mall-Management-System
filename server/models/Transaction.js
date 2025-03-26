import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalamount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
