const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const Podcast = require("../models/productModel");

exports.createProduct = CatchAsyncErrors(async (req, res, next) => {
  const { name, description, category } = req.body;

  const podcast = await Podcast.create({
    name,
    description,
    category,
  });

  await podcast.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    podcast,
  });
});

exports.getProducts = CatchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.find();

  res.status(200).json({
    success: true,
    podcast,
  });
});

exports.productDetails = CatchAsyncErrors(async (req, res, next) => {
  const podcast = await Podcast.findById(req.params.id);

  if (!podcast) {
    return next(new ErrorHandler("Podcast not found!!", 404));
  }
  res.status(200).json({
    success: true,
    podcast,
  });
});
