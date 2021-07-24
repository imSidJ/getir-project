const logger = require('./logger');

let errorList = {
  error_400: {
    invalid_params: {
      status: 400,
      message: 'Invalid params provided.',
      error_code: 'invalid_params',
      errors: [],
    },
  },
  error_401: {
    invalid_credentials: {
      status: 401,
      message: 'Invalid credentials provided.',
      error_code: 'invalid_credentials',
      errors: [],
    },
  },
  error_429: {
    rateLimit_exceeded: {
      status: 429,
      message: 'Rate limit exceeded.',
      error_code: 'limit_exceeded',
      errors: [],
    },
  },
  error_500: {
    server_error: {
      status: 500,
      message: 'Unable to process request.',
      error_code: 'server_error',
      errors: [],
    },
  },
};

function formatErrorObject(errJson) {
  let err = new Error(errJson.message);
  err.status = errJson.status;
  err.error_code = errJson.error_code;
  return err;
}

const errorHandler = (err, req, res, next) => {
  logger.error(err);
  if (err.error_code)
    res.status(err.status).send({
      status: err.status,
      message: err.message,
      error_code: err.error_code,
    });
  else if (err.status === 404)
    res.status(404).send({
      status: 404,
      message: 'Resource Not Found.',
      error_code: 'service_not_found',
    });
  else if (err.errors)
    res.status(400).send({
      status: 400,
      message: err.message,
      error_code: 'invalid_params',
    });
  else
    res.status(502).send({
      status: 502,
      message: 'Invalid response from service.',
      error_code: 'service_invalid_response',
    });
};

module.exports = {
  errorList,
  formatErrorObject,
  errorHandler,
};
