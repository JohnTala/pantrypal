import { Schema, model, models } from "mongoose";

const PantryItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an item name"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please provide a category"],
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, "Please provide a quantity"],
      min: [1, "Quantity must be at least 1"],
    },

    unit: {
      type: String,
      default: "item",
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: [true, "Please provide an expiry date"],
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

const PantryItem =
  models.PantryItem || model("PantryItem", PantryItemSchema);

export default PantryItem;