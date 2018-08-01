const express = require('express');
const engines = require('consolidate');
const morgan = require('morgan');
const path = require('path');


module.exports = function () {
   app = express();

   if (process.env.NODE_ENV === 'development') {
      app.use(morgan('dev')); // Logger
   }

   /**
    * TODO DEBUG:
    * Not using templates, so no need for template engines or defining where they can be found.
    * app.engine('html', engines.mustache);
    * app.set('views', './');
    * app.set('view engine', 'html');
    */

   require('../app/routes/index.server.routes.js')(app);
   // All static files referenced by index.html are under directory public. This is its path:
   app.use(express.static('./public/'));
   return app;
}