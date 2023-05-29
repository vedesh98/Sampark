const mongoose = require("mongoose");
const fs = require("fs");

exports.mongooseConnection = () => {
  const url = process.env.URL;
  // const url = 'mongodb://localhost:3000/' ;
  mongoose.connect(url);
};

exports.createFile = (dataForFile, fileName) => {
  let data = "";
  data = "Name\tPhone\n";

  for (let i = 0; i < dataForFile.length; i++) {
    data = data + dataForFile[i].name + "\t" + dataForFile[i].phone + "\n";
  }
  fs.appendFile(fileName + ".xls", data, (err) => {
    if (err) throw err;
    console.log("File created");
  });
};
