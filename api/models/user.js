const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  userBhoolku: { type: mongoose.SchemaTypes.ObjectId, required: true },
  accessLevel: { type: ["mandal", "sabha"], require: false },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  accessToattendance: { type: JSON },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  changedAt: { type: Date, default: () => Date.now() },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("User", userSchema);
