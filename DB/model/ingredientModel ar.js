import mongoose from "mongoose";

const ingredientArSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
    },
      image: {
        url: {
          type: String,
          required :true,
        },
        id: {
          type: String,
          required :true
        },
        
      },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "CategoryAr",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("IngredientAr", ingredientArSchema);
