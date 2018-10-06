const debug = require('debug')('app:routing')
const rateLimit = require("express-rate-limit");
const favicon = require('express-favicon');

module.exports = (app) => {

  // Controllers for routes to interface with
  const siteControllers = require('../controllers/siteControllers')
  const apiControllers = require('../controllers/apiControllers')

  // Rate limits
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    message: {
      error: "Rate limit exceeded."
    }
  });

  app.use(limiter);

  app.use(favicon("./assets/favicon.ico"));

  // Frontend Stuff
  app.route('/')
    .get(siteControllers.index)

  app.route('/logo')
    .get(siteControllers.logo)

  app.route('/license')
    .get(siteControllers.license)


  // API Stuff
  app.route('/api/generate')
    .get(apiControllers.generate)


  // Routing middleware (404s)
  app.use((req, res) => {
    debug(`404 on ${req.originalUrl}`)
    res.status(404).send({error: req.originalUrl + ' not found'});
  });



}
