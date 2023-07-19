const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, "anykey", (err, decodedUser) => {
    if (err) {
      return false;
    } else {
      return decodedUser;
    }
  });
};

module.exports = verifyToken;
