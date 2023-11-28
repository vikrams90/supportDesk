const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userCollection = require("../models/userModel");

// creating auth middleware for protected route uysing jwt tokens
const auth = asyncHandler(async (req, res, next) => {
  let token;

  // checking if token is coming in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // spliting bearer and token
      token = req.headers.authorization.split(" ")[1];

      // using verify method of jwt to verify token
      const verifiedUser = jwt.verify(token, process.env.JWT_KEY);

      // selecting user using decrypted id
      req.user = await userCollection
        .findById(verifiedUser.id)
        .select("-password");

      // if there is no user with matching id throwing error
      if (!req.user) {
        res.status(401);
        throw new Error(
          "user not authorized initiating self destruct in 5...4..3...2...1...."
        );
      }

      // if user verified and found move to protected route
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error(
        "user not authorized initiating self destruct in 5...4..3...2...1...."
      );
    }
    // if there is no token or verification failed throwing error
    if (!token) {
      res.status(401);
      throw new Error(
        "user not authorized initiating self destruct in 5...4..3...2...1.... "
      );
    }
  } else {
    throw new Error("not authorized");
  }
});

module.exports = auth;
