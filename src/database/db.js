const mongoose = require("mongoose");

const logger = require("../helpers/logger");

const url = process.env.DATABASE_URL;

const db = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    logger.info("Connected to DB");
  } catch (error) {
    logger.error(`Mongo connection error - ${error.message}`);
  }
};

module.exports = db;
