const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false, default: "" },
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", schema);
