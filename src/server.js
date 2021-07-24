require('dotenv').config();

const app = require('./app');
const db = require('./database/db');
const logger = require('./helpers/logger');

const start = async () => {
  const connection = await db();

  if (connection) {
    app.listen(process.env.PORT || 3000, async () => {
      logger.info('Server started on port 3000');
    });
  }
};

start();
