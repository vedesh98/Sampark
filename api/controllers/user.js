const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.Users_signup = async (request, response, next) => {
  try {
    const fetchUser = await User.find({ email: request.body.email }).select(
      "email _id"
    );
    if (fetchUser.length >= 1) {
      response.status(409).send(fetchUser);
    } else {
      bcrypt.hash(request.body.password, 10, async (error, hash) => {
        if (error) {
          response.status(500).send({
            error: error,
          });
        } else {
          const userCreated = await User.create({
            _id: new mongoose.Types.ObjectId(),
            email: request.body.email,
            password: hash,
          });

          process.env.USER = userCreated.email;
          response.status(500).send(userCreated);
        }
      });
    }
  } catch (error) {
    throw error;
  }
};

exports.User_login = async (request, response, next) => {
  try {
    const fetchuser = await User.findOne({ email: request.body.email });
    if (!fetchuser) {
      response.status(401).send({
        error: true,
        message: `Auth failed`,
      });
    } else {
      bcrypt.compare(
        request.body.password,
        fetchuser.password,
        async (error, compareResponse) => {
          if (error) {
            response.status(500).send({
              error: true,
              message: `Auth failed`,
            });
          }
          if (compareResponse) {
            const token = jwt.sign(
              {
                email: fetchuser.email,
                userId: fetchuser._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "24hr",
              }
            );
            process.env.USER = fetchuser.email;
            response.status(200).send({
              error: false,
              message: `Auth Successful`,
              token: token,
            });
          }
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.User_delete = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const isDeleted = await User.findByIdAndRemove({ _id: userId });
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: `User with ID ${userId} deleted successfully.`,
      });
    } else {
      response.status(404).send({
        error: true,
        message: `User with ID ${userId} not found.`,
      });
    }
  } catch (error) {
    throw error;
  }
};
