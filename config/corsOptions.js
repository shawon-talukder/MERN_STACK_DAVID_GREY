/*
 *
 *
 ------->Title: cors option
 ->Description: this is to handle cors options and handle cors allowed origins
 ------>Author: Shawon Talukder
 -------->Date: 01/16/2023
 *
 *
 */

const allowedOrigin = require("./allowedOrigin");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
