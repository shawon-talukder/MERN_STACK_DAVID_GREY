/*
 *
 *
 ------->Title: error handler middleware
 ->Description: this handler is a middlewaare that handles if an error occured
 ------>Author: Shawon Talukder
 -------->Date: 01/16/2023
 *
 *
 */

//dependencies
const { logEvents } = require("./logger");

//model scaffolding
const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t ${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; //server error
  res.status(status);
  res.json({ message: err.message, isError: true });
};

//export model
module.exports = errorHandler;
