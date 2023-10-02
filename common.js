const mongoose = require("mongoose");
const fs = require("fs");

exports.mongooseConnection = () => {
  const url = process.env.URL;
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

exports.readDataFromFile = (fileName = 'members.xls') => {
  let XLSX = require("xlsx");
  let workbook = XLSX.readFile(fileName);
  let sheet_name_list = workbook.SheetNames;
  let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData.map((bhoolu) => {
    return {
      name: `${bhoolu['First Name']} ${bhoolu['Last Name']} `,
      phone: bhoolu.Mobile,
      dateOfbirth: Date(bhoolu['Birth Date']),
      email: bhoolu.Email,
      category: 'Yuvak',
      referanceBhoolku: '645a7b62485cab966ad0aafd',
      baseMandal: '645fe3a0400e7b6cd192fdba'
    };
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

// This will returns errormessage by passing error no. 
exports.ErrorMessage = (errorNo, errVar1, errVar2, errVar3, errVar4) => {
  const Messages = {
    '001': 'Not found',
    '002': `Please select valid sabha.`,
    '003': `Auth failed`,
    '004': `Bhoolku with ID ${errVar1} deleted successfully.`,
    '005': `Bhoolku with ID ${errVar1} not found.`,
    '006': `Mandal with ID ${errVar1} deleted successfully.`,
    '007': `Mandal with ID ${errVar1} not found.`,
    '008': `Sabha with ID ${errVar1} deleted successfully.`,
    '009': `Sabha with ID ${errVar1} not found.`,
    '010': `Auth Successful`,
    '011': `User with ID ${errVar1} deleted successfully.`,
    '012': `User with ID ${errVar1} not found.`,
    '013': `please provide valid token to access this`
  }
  return Messages[errorNo];
}