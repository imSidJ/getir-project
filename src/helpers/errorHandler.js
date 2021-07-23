const errorList = require("../config/errorConfig");
const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  const errorBody = {
    code: 1,
    msg: "Failed",
    errors: err.message,
  };

  if (err.status === 404) {
    res.status(404).send(errorBody);
  }

  // res.status().send(errorBody);
};

module.exports = errorHandler;
