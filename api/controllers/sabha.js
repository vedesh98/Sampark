const Sabha = require("../models/sabha");
const common = require("../../common");


exports.sabha_get = async (request, response, next) => {
  try {
    const fetchSabha = await Sabha.find(request.query);
    response.status(200).send(fetchSabha);
  } catch (error) {
    next(error)
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
        mandal: request.body.mandal,
        mandalName: request.body.mandalName,
        category: request.body.category,
        sabhaName: request.body.sabhaName,
        createdBy: request.userData.userId,
      });

      response.status(201).send(creatSabha);
    }
  } catch (error) {
    next(error)
  }
};

exports.sabha_get_single = async (request, response, next) => {
  try {
    const { sabhaId } = request.params;
    const fetchSabha = await Sabha.findById(sabhaId);
    response.status(200).send(fetchSabha);
  } catch (error) {
    next(error)
  }
};

exports.sabha_update = async (request, response, next) => {
  try {
    const { sabhaId } = request.params;
    request.body.changedBy = request.userData.userId;
    const updatesabha = await Sabha.updateOne(
      { _id: sabhaId },
      { $set: request.body }
    );
    response.status(200).send(updatesabha);
  } catch (error) {
    next(error)
  }
};

exports.sabha_delete = async (request, response, next) => {
  try {
    const { sabhaId } = request.params;
    const isDeleted = await Sabha.findByIdAndRemove(sabhaId);
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: common.ErrorMessage('008', sabhaId),
        //`Sabha with ID ${sabhaId} deleted successfully.`,
      });
    } else {
      response.status(200).send({
        error: true,
        message: common.ErrorMessage('009', sabhaId),
        //`Sabha with ID ${sabhaId} not found.`,
      });
    }
  } catch (error) {
    next(error)
  }
};
