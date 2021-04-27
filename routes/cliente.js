const { Router } = require('express');
const { check } = require('express-validator');
const { crearCliente, modificarCliente, eliminarCliente, getClientes, getClienteById } = require('../controllers/cliente');
const { validarCampo } = require('../middlewares/validar-campos');

const router = Router();


// Get clientes
router.get('/', getClientes);

// Get clientes
router.get('/:id', getClienteById);

// Creación del Cliente
router.post('/nuevo', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('mName', 'El apelido materno es obligatorio').not().isEmpty(),
    check('lName', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('phoneNumber', 'El teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    validarCampo
], crearCliente);

// Modificación del Cliente
router.put('/editar/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('mName', 'El apelido materno es obligatorio').not().isEmpty(),
    check('lName', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('phoneNumber', 'El teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    validarCampo
], modificarCliente);


// Eliminación del Cliente
router.delete('/eliminar/:id', eliminarCliente);


module.exports = router;