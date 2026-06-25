const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "author",
      enum: ["author", "admin"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    totalBlogs: {
      type: Number,
      default: 0,
    },
    totalAIRequests: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
