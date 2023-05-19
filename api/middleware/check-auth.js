const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    request.userData = decoded;
    next();
        
    } catch (error) {
      response.status(401).send({
        message: 'Auth failed'
      })
    }
}