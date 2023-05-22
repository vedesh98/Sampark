const mongoose = require("mongoose");

const mandalSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true },
  mandalLeaders: { type: [mongoose.SchemaTypes.ObjectId], required: false },
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

module.exports = mongoose.model("Mandal", mandalSchema);
