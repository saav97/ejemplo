const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileUpload');
const app=express();

app.set('port',3002);

app.use(express.json());

app.use(morgan("dev"));

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath:true
}));

app.use('/api/productos',require('./routes/product.routes'));
app.use('/api/uploads',require('./routes/uploads.routes'));
app.use('/api/users', require('./routes/user.routes'));

module.exports = app;