const mongoose = require("mongoose");

const bhoolkuSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfbirth: { type: Date, required: false },
  category: {
    type: String,
    enum: ["Balyuvak", "Yuvak", "Yuvati", "Balika"],
    require: true,
  },
  baseSabha: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Sabha",
    required: false,
  },
  referanceBhoolku: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Bhoolku",
    required: false,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedAt: { type: Date },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
});

module.exports = mongoose.model("Bhoolku", bhoolkuSchema);
