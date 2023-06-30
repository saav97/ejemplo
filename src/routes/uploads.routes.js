const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo, updateImage } = require('../controllers/uploads.controller');
const { tablasPermitidas } = require('../helpers/db-validators');

const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.post( '', cargarArchivo);
router.put('/:tabla/:id', updateImage)


module.exports = router;
