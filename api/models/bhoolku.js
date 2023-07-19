const mongoose = require("mongoose");

const bhoolkuSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfbirth: {
    type: Date,
    required: true,
    validate: {
      validator: ( birthDate ) => birthDate < Date.now(),
      message: ( props ) => "Please enter valid date",
    },
  },
  age: {
    type: Number,
    min: 1,
  },
  email: { type: String, unique: true, lowercase: true },
  category: {
    type: String,
    enum: ["Balyuvak", "Yuvak", "Yuvati", "Balika"],
    require: true,
  },
  baseMandal: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Mandal",
    required: true,
  },
  baseSabha: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Sabha",
    required: false,
  },
  referanceBhoolku: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Bhoolku",
    required: true,
  },
  followupBhoolku: {
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
  changedAt: { type: Date, default: () => Date.now() },
  changedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

// bhoolkuSchema.virtual("age").get(function () {
//   let monthDiff = Date.now() - this.dateOfbirth.getTime();
//   let ageDate = new Date(monthDiff);
//   let year = ageDate.getUTCFullYear();
//   console.log(year);
//   return Math.abs(year - 1970);
// });

bhoolkuSchema.static.calcage = function (Bhoolku) {
  let monthDiff = Date.now() - Bhoolku.dateOfbirth.getTime();
  let ageDate = new Date(monthDiff);
  let year = ageDate.getUTCFullYear();
  console.log(year);
  return Math.abs(year - 1970);
};

module.exports = mongoose.model("Bhoolku", bhoolkuSchema);