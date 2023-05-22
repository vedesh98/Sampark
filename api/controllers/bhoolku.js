const Bhoolku = require("../models/bhoolku");
const mongoose = require("mongoose");

exports.bhoolku_get_all = async (request, response, next) => {
  try {
    console.log(request.query);
    const responseponse = await Bhoolku.find(request.query, {
      name: 1,
      phone: 1,
      category: 1,
    } );
    response.send(responseponse);
  } catch (error) {
    throw error.message;
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
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        phone: request.body.phone,
        dateOfbirth: request.body.dateOfbirth,
        category: request.body.category,
        referanceBhoolku: request.body.referanceBhoolku,
        createdBy: request.userData.userId,
      });

      response.status(201).send(createdbhoolku);
    }
  } catch (error) {
    throw error;
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
    throw error;
  }
};

exports.bhoolku_update = async (request, response, next) => {
  try {
    const { bhoolkuId } = request.params;
    request.body.changedBy = request.userData.userId;
    request.body.changedAt = Date.now();
    const updateBhoolku = await Bhoolku.updateOne(
      { _id: bhoolkuId },
      { $set: request.body }
    );

    response.status(200).send(updateBhoolku);
  } catch (error) {
    throw error.message;
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
    throw error;
  }
};

// router.get('/', (request, response, next) => {
//     Bhoolku.find()
//         .select('name phone _id')
//         .then(doc => {
//             const responseponse = {
//                 count: doc.length,
//                 products: doc.map( docs => {
//                     return {
//                         name: docs.name,
//                         phone: docs.phone,
//                         _id: docs._id,
//                         requestuest: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/bhoolkus/' + docs._id
//                         }
//                     }
//                 })
//             }
//             response.status(200).json(responseponse);
//         })
//         .catch(err => {
//             console.log(err);
//             response.status(500).json({
//                 error: err
//             });
//         });
// });
// router.post('/', (request, response, next) => {
//     Bhoolku.find({ name: request.body.name })
//         .then(responseult => {
//             if (responseult.length > 0) {
//                 return response.status(500).json({
//                     message: 'Aready Exists',
//                     name: responseult[0].name,
//                     phone: responseult[0].phone,
//                     _id: responseult[0]._id,
//                     requestuest: {
//                         type: 'GET',
//                         url: 'http://localhost:3000/bhoolkus/' + responseult[0]._id
//                     }
//                 })
//             }
//             const bhoolku = new Bhoolku({
//                 _id: new mongoose.Types.ObjectId(),
//                 name: request.body.name,
//                 phone: request.body.phone
//             });
//             bhoolku.save().then(responseult => {
//                 console.log(responseult);
//                 response.status(201).json({
//                     message: 'Created bhoolku successfully',
//                     createdProduct: {
//                         name: responseult.name,
//                         phone: responseult.phone,
//                         _id: responseult._id,
//                         responseult: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/bhoolkus/' + responseult._id
//                         }
//                     }
//                 });
//             })

//         }).catch(err => {
//             console.log(err);
//             response.status(500).json({ error: err });
//         });
// });

// router.get('/:bhoolkuId', (request, response, next) => {
//     const id = request.params.bhoolkuId;
//     Bhoolku.findById(id)
//         .select('name phone _id')
//         .then(doc => {
//             console.log('From DataBase', doc);
//             if (doc) {
//                 response.status(200).json({
//                     bhoolku: doc,
//                     requestuest: {
//                         type: 'GET',
//                         url: 'http://localhost/bhoolkus'
//                     }
//                 });
//             }
//             else {
//                 response.status(404).json({ message: 'No valid entry found for provided ID' });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             response.status(500).json({ error: err });
//         });
// });
