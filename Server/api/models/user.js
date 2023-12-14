"use strict"
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userBhoolku: { type: mongoose.SchemaTypes.ObjectId },// required: true },
  accessLevel: { type: ["mandal", "sabha"], require: false },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  accessToattendance: { type: JSON },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
}, { timestamps: true, });

module.exports = mongoose.model("User", userSchema);
