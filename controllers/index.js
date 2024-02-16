const router = require('express').Router();

// Import API routes
const apiRoutes = require('./api');
// Import home routes
const homeRoutes = require('./home-routes.js');
// Import dashboard routes
const dashboardRoutes = require('./dashboard-routes.js');

// Middleware for API routes
router.use('/api', apiRoutes);

// Middleware for home routes
router.use('/', homeRoutes);

// Middleware for dashboard routes
router.use('/dashboard', dashboardRoutes);

// Middleware for handling 404 errors
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
