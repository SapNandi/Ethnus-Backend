const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorMiddleware = require("./Middleware/error");

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports

const userRoute = require("./routes/UserRoute");
const podcastRoute = require("./routes/ProductRoute");
app.use("/api/v1", userRoute);
app.use("/api/v1", podcastRoute);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
