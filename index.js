require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config();

const express = require('express');
const app = express();
const api = require('./api');
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());

app.use('/api/v1', api);

app.use(morgan('combined'));

app.get('*', (_req, res) => {
  res.send({ error: 'unknown route' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
});