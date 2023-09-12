const Bhoolku = require("../models/bhoolku");
const mongoose = require("mongoose");
const common = require("../../common");

exports.bhoolku_get_all = async (request, response, next) => {
  try {
    console.log(request.query);
    const responseponse = await Bhoolku.find(request.query, {
      name: 1,
      phone: 1,
      category: 1,
    });
    response.send(responseponse);
  } catch (error) {
    next(error)
  }
};

exports.bhoolku_create = async (request, response, next) => {
  try {
    const fetchBhoolku = await Bhoolku.find({
      name: request.body.name,
      phone: request.body.phone,
    });
    if (fetchBhoolku.length > 0) {
      response.status(400).send(fetchBhoolku);
    } else {
      const createdbhoolku = await Bhoolku.create({
        name: request.body.name,
        phone: request.body.phone,
        dateOfbirth: request.body.dateOfbirth,
        email: request.body.email,
        category: request.body.category,
        referanceBhoolku: request.body.referanceBhoolku,
        createdBy: request.userData.userId,
      });

      response.status(201).send(createdbhoolku);
    }
  } catch (error) {
    next(error)
  }
};

exports.bhoolku_get_bhoolku = async (request, response, next) => {
  try {
    const { bhoolkuId } = request.params;
    const fetchBhoolku = await Bhoolku.findById(bhoolkuId).populate(
      "referanceBhoolku"
    );
    response.status(200).send(fetchBhoolku);
  } catch (error) {
    next(error)
  }
};

exports.bhoolku_update = async (request, response, next) => {
  try {
    const { bhoolkuId } = request.params;
    request.body.changedBy = request.userData.userId;
    const updateBhoolku = await Bhoolku.updateOne(
      { _id: bhoolkuId },
      { $set: request.body }
    );

    response.status(200).send(updateBhoolku);
  } catch (error) {
    next(error)
  }
};

exports.bhoolku_delete = async (request, response, next) => {
  try {
    const { bhoolkuId } = request.params; //object destructuring
    const isDeleted = await Bhoolku.findOneAndRemove({ _id: bhoolkuId });
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: `Bhoolku with ID ${bhoolkuId} deleted successfully.`,
      });
    } else {
      response.status(404).send({
        error: true,
        message: `Bhoolku with ID ${bhoolkuId} not found.`,
      });
    }
  } catch (error) {
    next(error)
  }
};


// This method is for mass creation of bhoolkus from excel
exports.bhoolku_create_mass = async (request, response, next) => {
  let error_a = [];
  let success_a = [];
  let allArr = common.readDataFromFile();
  console.log(allArr);
  for (let arr of allArr) {
    try {
      const fetchBhoolku = await Bhoolku.find({
        // name: request.body.name,
        phone: arr.phone,
      });
      if (fetchBhoolku.length > 0) {
        // response.status(400).send(fetchBhoolku);
        continue;
      } else {
        const createdbhoolku = await Bhoolku.create({
          name: arr.name,
          phone: arr.phone,
          dateOfbirth: Date(arr.dateOfbirth),
          email: arr.email,
          category: arr.category,
          baseMandal: "645fe3a0400e7b6cd192fdba",
          referanceBhoolku: arr.referanceBhoolku,
          createdBy: request.userData.userId,
        });

        success_a.push(createdbhoolku);
      }
    } catch (error) {
      error_a.push(error);
    }
  }
  response.status(500).send({
    success: success_a,
    errors: error_a,
  });
};
