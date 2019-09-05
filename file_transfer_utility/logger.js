const config = require('./config');
const { createLogger, format } = require('winston');
const { combine } = format;


let DailyRotateFile = require('winston-daily-rotate-file');


const transport = new DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});


var logger = createLogger({
    level : config.loggingLevel,
    transports: [
      transport
    ],
    format: combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
        format.errors({ stack: true }),
        format.splat(),
        format.simple()
      ),
  });
 

  // export logger
  module.exports = logger;

