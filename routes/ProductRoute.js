const express = require("express");
const {
  getProducts,
  createProduct,
  productDetails,
} = require("../Controller/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");

const router = express.Router();

router.route("/getPodcast").get(getProducts);
router.route("/podcastDetails/:id").get(isAuthenticatedUser, productDetails);
router.route("/createPodcast").post(isAuthenticatedUser, createProduct);

module.exports = router;
