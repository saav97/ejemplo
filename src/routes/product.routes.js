const {Router} = require('express');
const {getProducts, addProduct, editProducto}  = require('../controllers/product.controller');

const router = Router();

router.get('/',getProducts);

router.post('/', addProduct);

router.put('/:id', editProducto)


module.exports = router;