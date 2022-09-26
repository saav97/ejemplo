const express = require('express');
const morgan = require('morgan');



const port=3000;

const app=express();

app.set('port',port);

app.use(express.json());

app.use(morgan("dev"));

app.use('/api/productos',require('./routes/product.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));

module.exports = app;