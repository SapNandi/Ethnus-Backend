const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");

// Register a user
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User

exports.logoutUser = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully!!",
  });
});

// Get User Details

exports.getMe = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
