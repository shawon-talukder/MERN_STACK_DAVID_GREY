/*
 *
 *
 ------->Title: logger file
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 01/16/2023
 *
 *
 */

//dependencies
const {format} = require("date-fns");
const {v4: uuid} = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async(message, logFileName)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    const FILE_PATH = path.join(__dirname, '..', 'logs');
    try {
        if(!fs.existsSync(FILE_PATH)){
            await fsPromises.mkdir(FILE_PATH);
        }
        await fsPromises.appendFile(path.join(FILE_PATH, logFileName), logItem);
    }catch(err){
        console.log("logger error", err);
    }
};

const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.path}`);
    next();
}

//export
module.exports = {
    logEvents, 
    logger
}