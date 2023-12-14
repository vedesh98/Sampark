const mongoose = require("mongoose");

const sabhaSchema = mongoose.Schema({
  mandal: { type: mongoose.SchemaTypes.ObjectId, required: true },
  mandalName: { type: String, required: true },
  category: {
    type: String,
    enum: ["Balyuvak", "Yuvak", "Yuvati", "Balika", "General"],
    required: true,
  },
  sabhaName: { type: String, required: true },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
}, { timestamps: true, });

module.exports = mongoose.model("Sabha", sabhaSchema);
