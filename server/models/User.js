import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  membershipPackage: [
    {
      packagename: { type: String, default: "basics" },
      activatedate: { type: Date, default: Date.now },
    },
  ],
  points: { type: Number, default: 0 },
  purchaseHistory: [
    {
      transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
      amount: { type: Number },
      category: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
