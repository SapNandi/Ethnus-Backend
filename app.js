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

const userRoute = require("./routes/UserRoute")
app.use("/api/v1", userRoute);


// Error Middleware
app.use(errorMiddleware);

module.exports = app;