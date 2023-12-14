const mongoose = require("mongoose");

const mandalSchema = mongoose.Schema({
  name: { type: String, required: true },
  mandalLeaders: { type: [mongoose.SchemaTypes.ObjectId], required: false },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
},  { timestamps: true, });

module.exports = mongoose.model("Mandal", mandalSchema);
