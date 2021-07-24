const { formatErrorObject, errorList } = require('../helpers/errorHandler');
const logger = require('../helpers/logger');

/*
For now API key is stored in environment variables.
In a real project this can be stored in a database
*/
const apiKeyCheck = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    logger.info('Client authentication failed');
    next(formatErrorObject(errorList['error_401']['invalid_credentials']));
  }

  next();
};

module.exports = apiKeyCheck;
