const apiRoute = require('./api/apiRoutes');

class RoutesCustom {
  constructor(app) {
    app.use('/api/v1', apiRoute);
  };
};

module.exports = RoutesCustom;