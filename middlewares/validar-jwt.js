const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {

    const token = req.header('token');

    if(!token)
         return res.status(401).json({
             msg: 'Token incorrecto'
         })

    try {

        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        // Creamos una nueva propiedad con la info del usuario
        req.usuario = {uid, name};

        
    } catch (error) {
        return res.status(401).json({
            msg: 'Token incorrecto'
        })
    }

    // TODO OK
    next();
        
   
}


module.exports = {
    validarToken
}