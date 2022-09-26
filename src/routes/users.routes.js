const {Router} = require('express');
const { check } = require('express-validator');
const { getUsers, addUser } = require('../controllers/users.controller');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsers);
router.post('/',[
    check('username', 'Username es requerido').notEmpty(),
    check('email', 'Debe ser un email valido').isEmail(),
    check('password').isLength({max:5}),
    validarCampo
], addUser);
//router.put('/:id');
//router.delete('/:id');

module.exports = router;