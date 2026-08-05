import { Schema, model, models } from "mongoose";

const isEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your full name"],
      minlength: [2, "Name must be at least 2 characters long"],
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email"],
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model("User", UserSchema);

export default User;