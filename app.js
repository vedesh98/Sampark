const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const common = require("./common");
const bhoolkuRoutes = require("./api/routes/bhoolkus");
const attendanceRoutes = require("./api/routes/attendance");
const userRoutes = require("./api/routes/user");
const mandalRoutes = require("./api/routes/mandals");
const sabhRoutes = require("./api/routes/sabha");
const birthdayBhoolkus = require("./api/routes/birthdayBhoolkus");

common.mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); 
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, content-Type, Accept, Authorization'
//     );
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// })

app.use("/bhoolkus", bhoolkuRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/user", userRoutes);
app.use("/sabha", sabhRoutes);
app.use("/mandals", mandalRoutes);
app.use("/birthdayBhoolkus", birthdayBhoolkus);

app.use(common.ErrorHandlling, common.ErrorMessageHandller);

module.exports = app;
