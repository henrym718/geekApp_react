import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: String,
    location: String,
    tags: [String],
    price: { type: Number, default: 0 },
    aboutGig: String,
    phone: String,
    faq: [{ question: String, answer: String }],
    coverImage: String,
    counter: { type: Number, default: 0 },
    active: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    createdAt: { type: Date, default: new Date() },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);
const productModel = model("Product", productSchema);

export { productModel };
