import { model, Schema } from "mongoose"

const skillSchema = new Schema(
    {
        _id: { type: Schema.Types.ObjectId, ref: "Subcategory" },
        skills: [String]
    },
    {
        timestamps: false,
        versionKey: false
    })

const skillModel = model("Skill", skillSchema)
export { skillModel }