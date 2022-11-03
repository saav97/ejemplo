const {Router} = require('express');
const {getProducts, addProduct}  = require('../controllers/product.controller');

const router = Router();

router.get('/',getProducts);

router.post('/',addProduct);

module.exports =  router;