/*
 *
 *
 ------->Title: server file
 ->Description: this is a server file for "technotes" - full stack web application
 ------>Author: Shawon Talukder
 -------->Date: 01/16/2023
 *
 *
 */
//external dependencies
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//internal dependencies
const connectDB = require("./config/dbConn");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const routes = require("./routes/root");
const errorHandler = require("./middleware/errorHandler");

//model scaffolding
const app = express();

//configuration
const PORT = process.env.PORT || 3500;

connectDB();

//middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  "/",
  express.static(path.join(__dirname, "public"))
); /* also : app.use(express.static('public')) */

//router path
app.use("/", routes);

//404 not found
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found!");
  }
});

//error handler middleware
app.use(errorHandler);

//check if mongoDB connection is successful
mongoose.connection.once("open", () => {
  console.log("Database connection successful!");
  //run the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
