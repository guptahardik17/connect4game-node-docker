const apiRoutes = require('@routes/api');

/**
 * defines routes for application
 */
const load = (app) => {
  app.use('/', apiRoutes);
};

module.exports = {
  load
};
