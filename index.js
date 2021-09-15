require('dotenv').config();
console.clear();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const links = require('./links/links.routes');
const { errorHandler, notFound, databaseStatus } = require('./middlewares');
const connect = require('./lib/database');

// Configs
const { WEB_SERVER } = require('./lib/configs');
const { getLinkByUniqueid } = require('./links/links.controller');

const app = express();

//Database
connect()
  .then(client => {
    console.log('Connected to mongodb');
    app.set('database', true);
    app.set('database-client', client);
  })
  .catch(err => {
    console.log(`Error connecting to mongodb: ${err}`);
    app.set('database', false);
  });

// Middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());

// Route

// GET ../:id - Redirect to specific URL id

app.get('/:id', databaseStatus, async (req, res, next) => {
  try {
    const link = await getLinkByUniqueid(req.params.id);
    console.log(link);
    res.redirect(link.original);
  } catch (error) {
    return next(error);
  }
});

app.use('/links', databaseStatus, links);

app.listen(WEB_SERVER.PORT, () => {
  console.log(`Running on port: ${WEB_SERVER.PORT}`);
});

app.use(notFound);
app.use(errorHandler);
