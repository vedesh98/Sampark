const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  date: { type: Date, required: true },
  sabha: { type: mongoose.SchemaTypes.ObjectId, require: true },
  vakta1: { type: mongoose.SchemaTypes.ObjectId, require: true },
  vakta2: { type: mongoose.SchemaTypes.ObjectId },
  topic1: { type: String, require: true },
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
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    immutable: true,
  },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
}, { timestamps: true, }
);

module.exports = mongoose.model("Attendanse", attendanceSchema);
