import express from 'express';
import morgan from 'morgan';
import productRouter from './routes/product.routes';

const app=express();

app.set('port',3002);

app.use(express.json());

app.use(morgan("dev"));

app.use('/api/productos',productRouter);

export default app;