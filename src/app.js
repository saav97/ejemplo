const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');



const port=3000;

const app=express();

//middlewares

app.set('port',port);

app.use(express.json());

app.use(morgan("dev"));

//cargas de archivos
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}));

app.use('/api/productos',require('./routes/product.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
module.exports = app;