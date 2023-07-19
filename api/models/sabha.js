const mongoose = require("mongoose");

const sabhaSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  mandal: { type: mongoose.SchemaTypes.ObjectId, required: true },
  mandalName: { type: String, required: true },
  category: {
    type: String,
    enum: ["Balyuvak", "Yuvak", "Yuvati", "Balika", "General"],
    required: true,
  },
  sabhaName: { type: String, required: true },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedAt: { type: Date, default: () => Date.now() },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
});

module.exports = mongoose.model("Sabha", sabhaSchema);
