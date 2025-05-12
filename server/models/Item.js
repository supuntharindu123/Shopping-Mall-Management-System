import mongoose from "mongoose";
const itemschema = new mongoose.Schema({
  shopid: { type: String, required: true },
  name: { type: String, required: true },

  price: { type: Number, required: true },

  imageUrl: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model("Item", itemschema);
export default Item;
