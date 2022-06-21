const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  // Check if a token has been provided
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  // Verify the token provided
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorised!" });
    }
    req.userId = decoded.id;
    // calls next bit of middleware if one is listed,
    // in which you can then use req.userId
    next();
  });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;
