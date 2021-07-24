const rateLimit = require('express-rate-limit');
const { formatErrorObject, errorList } = require('../helpers/errorHandler');

/*
In production we can store these value in Redis
We can use an existing npm package like rate-limit-redis or build a custom solution
*/
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 15, // limit each IP to 10 requests
  handler: (req, res, next) =>
    next(formatErrorObject(errorList['error_429']['rateLimit_exceeded'])),
});

module.exports = limiter;
