const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  let tokenis = request.headers.authorization;
  if (!tokenis) {
    response
      .status(401)
      .json({ message: "please provide valid token to access this" });
  }
  try {
    const token = tokenis.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    request.userData = decoded;
    next();
    
  } catch (error) {
    response.status(401).send({
      message: "Auth failed",
    });
  }
};