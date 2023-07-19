const mongoose = require("mongoose");
const fs = require("fs");

exports.mongooseConnection = () => {
  const url = process.env.URL;
  // const url = 'mongodb://localhost:3000/' ;
  mongoose.connect(url);
};

exports.createFile = (dataForFile, fileName) => {
  let data = "Name\tPhone\n";

  for (let i = 0; i < dataForFile.length; i++) {
    data = data + dataForFile[i].name + "\t" + dataForFile[i].phone + "\n";
  }
  fs.appendFile(fileName + ".xls", data, (err) => {
    if (err) throw err;
    console.log("File created");
  });
};

exports.CalcAge = (DOB) => {
  let monthDiff = Date.now() - DOB.getTime();
  let ageDate = new Date(monthDiff);
  let year = ageDate.getUTCFullYear();
  console.log(year);
  return Math.abs(year - 1970);
};

exports.ErrorHandlling = (request, response, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};

exports.ErrorMessageHandller = (error, request, response, next) => {
  response.status(error.staus || 500).send({
    error: {
      message: error.message,
    },
  });
};
