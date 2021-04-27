const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();


// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampo
],crearUsuario);

// Login usuario
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampo
], loginUsuario);


// Validar y revalidar token
router.get('/renew', validarToken, revalidarToken);




module.exports = router;