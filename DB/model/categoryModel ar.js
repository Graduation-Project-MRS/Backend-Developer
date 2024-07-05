import mongoose from "mongoose";

const categoryArSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
    },
    // image: {
    //   url: {
    //     type: String,
    //     default: "",
    //   },
    //   id: {
    //     type: String,
    //     default: "",
    //   },
    // },
  },
  { timestamps: true }
);

export default mongoose.model("CategoryAr", categoryArSchema);
