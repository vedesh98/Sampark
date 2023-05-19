const mongoose = require("mongoose");

const mandalSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true },
  mandalLeaders: { type: [mongoose.SchemaTypes.ObjectId], required: false },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});

module.exports = mongoose.model("Mandal", mandalSchema);
