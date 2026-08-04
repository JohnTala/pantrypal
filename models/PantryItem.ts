import { Schema, model, models } from "mongoose";

const PantryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    unit: {
      type: String,
      required: true,
      default: "pcs",
      trim: true,
    },

    expirationDate: {
      type: Date,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default models.PantryItem || model("PantryItem", PantryItemSchema);
