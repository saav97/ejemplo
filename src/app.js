const express = require('express');
const morgan = require('morgan');



const port=3000;

const app=express();

app.set('port',port);

app.use(express.json());

app.use(morgan("dev"));

app.use('/api/productos',require('./routes/product.routes'));

module.exports = app;