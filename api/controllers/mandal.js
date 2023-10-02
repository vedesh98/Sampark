const Mandal = require("../models/mandal");
const common = require("../../common");

exports.Mandal_get_all = async (request, response, next) => {
  try {
    const fetchMandal = await Mandal.find(request.query, { _name: 1 });
    response.send(fetchMandal);
  } catch (error) {
    next(error)
  }
};

exports.Mandal_create = async (request, response, next) => {
  try {
    const fetchedMandal = await Mandal.find({ name: request.body.name });
    if (fetchedMandal.length > 0) {
      response.status(500).send(fetchedMandal);
    } else {
      const createMandal = await Mandal.create({
        name: request.body.name,
        createdBy: request.userData.userId,
      });

      response.status(201).send(createMandal);
    }
  } catch (error) {
    next(error)
  }
};

exports.Mandal_get = async (request, res, next) => {
  try {
    const { mandalId } = request.params;
    const fetchmandal = await Mandal.findById(mandalId);
    res.status(200).send(fetchmandal);
  } catch (error) {
    next(error)
  }
};

exports.Mandal_update = async (request, response, next) => {
  try {
    const { mandalId } = request.params;
    request.body.changedBy = request.userData.userId;
    const updatemandal = await Mandal.updateOne(
      { _id: mandalId },
      { $set: request.body }
    );
    response.status(200).send(updatemandal);
  } catch (error) {
    next(error)
  }
};

exports.Mandal_delete = async (request, response, next) => {
  try {
    const { mandalId } = request.params;
    const isDeleted = await Mandal.findByIdAndRemove({ _id: mandalId });
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: common.ErrorMessage('006', mandalId)
        // `Mandal with ID ${mandalId} deleted successfully.`,
      });
    } else {
      response.status(404).send({
        error: false,
        message: common.ErrorMessage('007', mandalId)
        // `Mandal with ID ${mandalId} not found.`,
      });
    }
  } catch (error) {
    next(error)
  }
};
