const { response } = require("express");
const Bhoolku = require("../models/bhoolku");
const mongoose = require("mongoose");

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
        },
      },
      {
        $match: { month: monthToday, day: day },
      },
    ]);
    response.status(200).send(fetchBhoolku);
  } catch (error) {
    throw error;
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
        },
      },
      {
        $match: { month: monthToday },
      },
    ]);
    response.status(200).send(fetchBhoolku);
  } catch (error) {
    throw error;
  }
};

exports.GET_BIRTHDAY_RANGE = async (request, response, next) => {
  try {
    const fetchBhoolku = await Bhoolku.find(request.query.query, {
      name: 1,
      phone: 1,
      category: 1,
    });
    response.send(responseponse);
  } catch (error) {
    throw error;
  }
};
