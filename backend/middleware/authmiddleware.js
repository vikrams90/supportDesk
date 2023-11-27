const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userCollection = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
  let token;

  console.log("hi");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token, "token");
      const verifiedUser = jwt.verify(token, process.env.JWT_KEY);

      console.log(verifiedUser, "jwt");

      req.user = await userCollection
        .findById(verifiedUser.id)
        .select("-password");

      console.log(req.user, "user");

      if (!req.user) {
        res.status(401);
        throw new Error(
          "user not authorized initiating self destruct in 5...4..3...2...1...."
        );
      }

      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error(
        "user not authorized initiating self destruct in 5...4..3...2...1...."
      );
    }

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
