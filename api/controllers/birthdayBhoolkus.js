const Bhoolku = require("../models/bhoolku");
const mongoose = require("mongoose");
const common = require("../../common");

exports.GET_BIRTHDAY_LIST_DAY = async (request, response, next) => {
  try {
    const date = new Date(request.body.date || Date.now());
    const day = date.getDate();
    const monthToday = date.getMonth() + 1;

    const fetchBhoolku = await Bhoolku.aggregate([
      {
        $project: {
          month: {
            $month: "$dateOfbirth",
          },
          day: {
            $dayOfMonth: "$dateOfbirth",
          },
          name: "$name",
          phone: "$phone",
          date: "$dateOfbirth",
          // age: "$age",
        },
      },
      {
        $match: { month: monthToday, day: day },
      },
    ]);
    response.status(200).send(fetchBhoolku); //map((bhoolku) => (bhoolku.age = bhoolku.age))
  } catch (error) {
    next(error);
  }
};

exports.GET_BIRTHDAY_LIST_MONTH = async (request, response, next) => {
  try {
    const date = new Date(request.body.date || Date.now());
    const monthToday = date.getMonth() + 1;

    const fetchBhoolku = await Bhoolku.aggregate([
      {
        $project: {
          month: {
            $month: "$dateOfbirth",
          },
          name: "$name",
          date: "$dateOfbirth",
          phone: "$phone",
          // age: "$age",
        },
      },
      {
        $match: { month: monthToday },
      },
    ]);
    
    response.status(200).send(
      fetchBhoolku.map((bhoolku) => {
        let newBhoolku = bhoolku;
        newBhoolku.age = common.CalcAge(bhoolku.date);
        return newBhoolku;
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.GET_BIRTHDAY_RANGE = async (request, response, next) => {
  try {
    const fromDate = new Date(request.query.dateOfbirth.gte);
    const toDate = new Date(request.query.dateOfbirth.lte);
    const fromDay = fromDate.getDate();
    const fromMonth = fromDate.getMonth() + 1;
    const toDay = toDate.getDate();
    const toMonth = toDate.getMonth() + 1;

    const fetchBhoolku = await Bhoolku.aggregate([
      {
        $project: {
          month: {
            $month: "$dateOfbirth",
          },
          day: {
            $dayOfMonth: "$dateOfbirth",
          },
          name: "$name",
          phone: "$phone",
          date: "$dateOfbirth",
        },
      },
      {
        $match: {
          month: { $lte: toMonth, $gte: fromMonth },
          day: { $lte: toDay, $gte: fromDay },
        },
      },
    ]);
    response.status(200).send(fetchBhoolku);
  } catch (error) {
    next(error);
  }
};
