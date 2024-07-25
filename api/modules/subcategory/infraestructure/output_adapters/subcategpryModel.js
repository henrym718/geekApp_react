import { model, Schema } from "mongoose";

const subcategoryShema = new Schema(
  {
    name: String,
    icon: String,
    cover: String,
    categoryid : {type: Schema.Types.ObjectId, ref: "Category" }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const subcategoryModel = model("Subcategory", subcategoryShema);

export { subcategoryModel };
