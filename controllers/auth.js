const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {
    const {name, password} = req.body;

    try {
        
  
    // Verificar el usuario
    let user = await Usuario.findOne({name});

    if(user)
        return res.status(400).json({
            msg: 'El usuario ya existe'
        });

    // Crear usuario con el modelo
    user = new Usuario(req.body);

    // Hash de la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Generar un JWT
    const token = await generarJWT(user.id, user.name);

    // Crear el usaurio en la DB
    await user.save();

    // Generar el response 
    return res.status(201).json({
        uid: user.id,
        name,
        token
    })


    } catch (error) {
            return res.status(500).json({
                msg: 'El servicio no se executó correctamente'
            })
    }
   
}

const loginUsuario = async (req, res = response) => {
    const {name, password} = req.body;

    try {
        
        const user = await Usuario.findOne({name});

        if(!user)
            return res.status(400).json({
                msg: 'El usuario y/o contraseña no son correctos'
            });
        
        // Confirmar si la constraseña es correcta
        const validPass = bcrypt.compareSync(password, user.password);

        if(!validPass)
            return res.status(400).json({
                msg: 'El usuario y/o contraseña no son correctos'
            });

        // Generar el JWT
        const token = await generarJWT(user.id, user.name);

        return res.status(200).json({
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'El servicio no se executó correctamente'
        })
    }
}

const revalidarToken = async (req, res = response) => {
    
    const { usuario } = req;

    // Generar nuevo token
    const token = await generarJWT(usuario.id, usuario.name);

    return res.status(200).json({
       ok: true,
       uid: usuario.uid,
       name: usuario.name,
       token
    });
  
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}