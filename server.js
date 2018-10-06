const express = require('express');
const app = express();
const port = process.env.PORT || 4005;
const debug = require('debug')('app:server')

const routes = require('./api/routes/appRoutes');
routes(app);

app.listen(port);
debug(`Server running on port ${port}`);
