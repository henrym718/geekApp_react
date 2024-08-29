import { Schema, model } from "mongoose";

const authSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const authModel = model("Auth", authSchema);
export { authModel };
