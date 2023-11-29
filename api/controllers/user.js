const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const common = require("../../common");

exports.Users_signup = async (request, response, next) => {
  try {
    const fetchUser = await User.find({ email: request.body.email }).select(
      "email _id"
    );
    if (fetchUser.length >= 1) {
      response.status(409).send(fetchUser);
      return;
    }
    console.log(request.body.email);
    console.log(request.body.password);
    bcrypt.hash(request.body.password, 10, async (error, hash) => {
      if (error) {
        response.status(500).send({
          error: error,
        });
        console.log(error);
        return;
      }
      const userCreated = await User.create({
        email: request.body.email,
        userBhoolku: request.body.userBhoolku,
        accessLevel: request.body.accessLevel,
        password: hash,
      });
      response.status(200).send(userCreated);

    });

  } catch (error) {
    next(error)
  }
};

exports.User_login = async (request, response, next) => {
  try {
    const fetchuser = await User.findOne({ email: request.body.email });
    if (!fetchuser) {
      response.status(401).send({
        error: true,
        message: common.ErrorMessage('003')
        // `Auth failed`,
      });
      return;
    }
    bcrypt.compare(
      request.body.password,
      fetchuser.password,
      async (error, compareResponse) => {
        if (error) {
          response.status(500).send({
            error: true,
            message: common.ErrorMessage('003')
            // `Auth failed`,
          });
          return;
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
          response.status(200).send({
            error: false,
            message: common.ErrorMessage('010'),
            // `Auth Successful`,
            token: token,
            email: fetchuser.email,
            userId: fetchuser._id,
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
};

exports.User_delete = async (request, response, next) => {
  try {
    const { userId } = request.params;
    const isDeleted = await User.findByIdAndRemove({ _id: userId });
    if (isDeleted) {
      response.status(200).send({
        error: false,
        message: common.ErrorMessage('011', userId),
        // `User with ID ${userId} deleted successfully.`,
      });
    } else {
      response.status(404).send({
        error: true,
        message: common.ErrorMessage('012', userId),
        // `User with ID ${userId} not found.`,
      });
    }
  } catch (error) {
    next(error)
  }
};
