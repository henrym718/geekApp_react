import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: String,
    urlIcon: String,
    urlCover: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const categoryModel = model("Category", categorySchema);
export { categoryModel };
