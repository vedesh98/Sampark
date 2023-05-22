// const { request, response } = require("express");
const mongoose = require("mongoose");
const Sabha = require("../models/sabha");

exports.sabha_get = async (request, response, next) => {
  try {
    const fetchSabha = await Sabha.find(request.query);
    response.status(200).send(fetchSabha);
  } catch (error) {
    throw error;
  }
};

exports.sabha_cteate = async (request, response, next) => {
  try {
    const fetchSabha = await Sabha.findOne({
      mandal: request.body.mandal,
      mandalName: request.body.mandalName,
      category: request.body.category,
      sabhaName: request.body.sabhaName,
    });

    if (fetchSabha) {
      response.status(500).send(fetchSabha);
    } else {
      const creatSabha = await Sabha.create({
        _id: new mongoose.Types.ObjectId(),
        mandal: request.body.mandal,
        mandalName: request.body.mandalName,
        category: request.body.category,
        sabhaName: request.body.sabhaName,
        createdBy: request.userData.userId,
      });

      response.status(201).send(creatSabha);
    }
  } catch (error) {
    throw error;
  }
};

exports.sabha_get_single = async (request, response, next) => {
  try {
    const { sabhaId } = request.params;
    const fetchSabha = await Sabha.findById(sabhaId);
    response.status(200).send(fetchSabha);
  } catch (error) {
    throw error;
  }
};

exports.sabha_delete = async (request, response, next) => {
  try {
    const { sabhaId } = request.params;
    const isDeleted = await Sabha.findByIdAndRemove(sabhaId);
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: `Sabha with ${sabhaId} deleted successfully.`,
      });
    } else {
      response.status(200).send({
        error: true,
        message: `Sabha with ${sabhaId} not found.`,
      });
    }
  } catch (error) {
    throw error;
  }
};
