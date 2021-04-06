const backendAuthRoute = require('./auth/authRoutes');
const backendAdminRoute = require('./backend/adminRoutes');
const apiRoute = require('./api/apiRoutes');

class RoutesCustom {
  constructor(app, validation) {
    app.use('/admin', backendAuthRoute);
    app.use('/admin', validation, backendAdminRoute);
    app.use('/api/v1', apiRoute);
  };
};

module.exports = RoutesCustom;