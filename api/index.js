const express = require('express');
const api = express.Router();
const { login, list, image, search } = require('./controllers');

api.get('/', (_req,res) => {
  res.send({ status: 'OK' });
});

api.get('/list', list);

api.get('/login', login);

api.get('/images/:id', image);

api.get('/search/:keyword', search);

module.exports = api;
