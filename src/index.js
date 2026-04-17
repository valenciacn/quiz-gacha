require('dotenv').config();
const mongoose = require('mongoose');
const { env, port } = require('./core/config');
const logger = require('./core/logger')('app');
const server = require('./core/server');

// Koneksi ke MongoDB Atlas
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => logger.info('Connected to MongoDB Atlas'))
  .catch((err) => logger.error(err, 'MongoDB connection error'));

const app = server.listen(port, (err) => {
  if (err) {
    logger.fatal(err, 'Failed to start the server.');
    process.exit(1);
  } else {
    logger.info(`Server runs at port ${port} in ${env} environment`);
  }
});

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception.');
  app.close(() => process.exit(1));
  setTimeout(() => process.abort(), 1000).unref();
});
