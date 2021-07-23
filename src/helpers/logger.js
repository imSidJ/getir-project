const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // timestamp: () => {
  //   return `,"timestamp":"${moment().format("YYYY-MM-DDTHH:mm:ss.SSS")}"`;
  // },
});

module.exports = logger;
