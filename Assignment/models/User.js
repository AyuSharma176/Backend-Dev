const mongoose = require("mongoose");
const { userActivityTracker } = require("../plugins/userActivityTracker");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(userActivityTracker);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
