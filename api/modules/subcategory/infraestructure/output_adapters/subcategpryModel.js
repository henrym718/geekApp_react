import { model, Schema } from "mongoose";

const subcategoryShema = new Schema(
  {
    name: String,
    urlIcon: String,
    urlCover: String,
    category : {type: Schema.Types.ObjectId, ref: "Category" }
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const subcategoryModel = model("Subcategory", subcategoryShema);

export { subcategoryModel };
