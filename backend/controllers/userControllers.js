const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const userCollection = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register 
// controller
// section
// 
const registerUser = asyncHandler(async (req, res) => {
  
  // with the help of body-parser middleware destructuring values in urlencoded
  const { name, email, password } = req.body;

  // throwing error if required field is missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all details");
  }

  // checking if user is already registered
  const userExist = await userCollection.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exists");
  }

  // using bcrypt to save hashed password in database
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);

  // inserting data in database
  const user = await userCollection.create({
    name,
    email,
    password: hashPassword,
  });

  // if user insertion is successfull then sending response back to the client also sending token with data
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});



// login 
// controller
// section 
const loginUser = asyncHandler(async (req, res) => {
  // destructing data from body using body parser middleware
  const { email, password } = req.body;

  // throwing error if one of required field is missing 
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all details");
  }

  // finding user in database
  const user = await userCollection.findOne({ email: email });

  // checking if user password match saved password also sending token with data
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credential");
  }
});

// testing protect route
const hello = (req,res)=>{
    res.send("hello")
}

// gereating token for id 
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  hello,
};
