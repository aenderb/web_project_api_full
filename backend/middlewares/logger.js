const winston = require("winston");
const expressWinston = require("express-winston");

// Logger para requisições (request.log)
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "request.log" })],
  format: winston.format.json(),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
});

// Logger para erros (error.log)
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
