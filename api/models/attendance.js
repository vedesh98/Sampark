const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  date: { type: Date, required: true },
  sabha: { type: mongoose.SchemaTypes.ObjectId, require: true },
  attendees: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: true,
    ref: "Bhoolku",
  },
  non_attendees: {
    type: [mongoose.SchemaTypes.ObjectId],
    require: true,
    ref: "Bhoolku",
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

module.exports = mongoose.model("Attendanse", attendanceSchema);
