const mongoose = require("mongoose");


exports.mongooseConnection = () => {
    const url = process.env.URL;
    mongoose.connect(url);
};


