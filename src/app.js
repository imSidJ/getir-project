const express = require('express');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const apiKeyCheck = require('./middlewares/apiKeyCheck');
const logger = require('./helpers/logger');
const { formatErrorObject, errorList, errorHandler } = require('./helpers/errorHandler');
const limiter = require('./middlewares/rateLimiter');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

const swaggerDocument = YAML.load(path.join(__dirname, './docs/api.yml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(apiKeyCheck);

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, './docs/api.yml'),
  })
);

app.use(routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Generic error handler
app.use(errorHandler);

module.exports = app;
