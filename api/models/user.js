const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  accessToattendance: { type: JSON },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model("User", userSchema);
