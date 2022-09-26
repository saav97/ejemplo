const {Router} = require('express');
const { check } = require('express-validator');
const {getProducts, addProduct, editProducto}  = require('../controllers/product.controller');
const { validarCampo } = require('../middlewares/validar-campos');
const router = Router();

router.get('/',getProducts);

router.post('/',[
    check('nombre, Nombre es requerido'),
    validarCampo
], addProduct);

router.put('/:id',editProducto);


module.exports = router;