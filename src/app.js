const express = require("express");
const swaggerUi = require("swagger-ui-express");
// import cors from "cors";
// import * as OpenApiValidator from "express-openapi-validator";
const YAML = require("yamljs");
const path = require("path");

const errorHandler = require("./helpers/errorHandler");

const routes = require("./routes");

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, "./docs/api.yml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use(errorHandler);

module.exports = app;
