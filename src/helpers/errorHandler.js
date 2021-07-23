const errorList = require('../config/errorConfig');
const logger = require('./logger');

const errorHandler = (err, req, res) => {
  logger.error(err.message);

  let statusCode = 500;
  const errorBody = {
    code: 1,
    msg: 'Failed',
    reason: 'Internal Server Error',
  };

  if (err.status === 400) {
    statusCode = errorList.error_400.invalid_params.status;
    errorBody.reason = errorList.error_400.invalid_params.message;
  } else if (err.status === 404) {
    statusCode = errorList.error_404.resource_notFound.status;
    errorBody.reason = errorList.error_404.resource_notFound.message;
  }

  res.status(statusCode).send(errorBody);
};

module.exports = errorHandler;
