const asyncHandler = require("express-async-handler");
const Users = require("../models/userModel");
const Books = require("../models/bookModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const registerUser = asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.name) {
    res.send("Provide Necessary Email Address");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    checkInBooks: req.body.checkInBooks,
  });
  if (newUser) {
    res.status(201).json({
      message: "User Registered",
      userName: newUser.name,
      userId: newUser._id,
    });
  } else {
    res.send("Invalid username or password");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const authenticateUser = await Users.findOne({ email });
  if (
    authenticateUser &&
    (await bcrypt.compare(password, authenticateUser.password))
  ) {
    res.json({
      userId: authenticateUser._id,
      userName: authenticateUser.name,
      email: authenticateUser.email,
      token: generateToken(authenticateUser._id)
    });
  } else {
    res
      .json({
        status: 404,
        message: "User not found",
      })
      .status(404);
  }
});

const checkInBooks = asyncHandler(async (req, res) => {
  Users.findOneAndUpdate({ _id: req.body.userId }, {
    $push: { checkInBooks: req.params.id }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });

});

const checkOutBooks = asyncHandler(async (req, res) => {
  Users.findOneAndUpdate({ _id: req.body.userId }, {
    $push: { checkOutBooks: req.params.id }
  },
  { new: true }, 
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

const getMe = asyncHandler(async(req,res) => {
  const currentUser = await Users.findById(req.params.id)
  res.send(currentUser)
})


const generateToken = (id) => {
  return jwt.sign({id},process.env.SECRET_KEY, {
    expiresIn:"30d"
  })
}
module.exports = {
  registerUser,
  loginUser,
  checkInBooks,
  getMe,
  checkOutBooks
};
