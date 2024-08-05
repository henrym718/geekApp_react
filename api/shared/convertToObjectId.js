import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const convertToObjectId = (idString) => new ObjectId(idString);
