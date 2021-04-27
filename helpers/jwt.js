const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {
    
    const payload = {uid, name};
    
    // Generámos un token de 30 días de vigencia
    return new Promise( (resolve, rejet) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: 60 * 60 * 24 * 30}, (err, token) => {
            if(err){
                rejet(err);
            } else {
                resolve(token);                
            }
        })
    });
}

module.exports = {
    generarJWT
}
