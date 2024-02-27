import mongoose, { Schema, Types, model } from "mongoose";

const famillySchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    
    adults: {
      type: Number,
      required: true,
    },
    babies: {
      type: Number,
      required: true,
    },
    childeren: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, strictQuery: true, toJSON: { virtuals: true } }
);


const famillyModel = mongoose.models.famillyModel || model("Familly", famillySchema);
export default famillyModel;
