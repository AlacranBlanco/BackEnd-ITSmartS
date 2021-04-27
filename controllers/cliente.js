const { response } = require('express');
const moment = require('moment');
const Cliente = require('../models/Cliente');


const crearCliente = async (req, res = response) => {
    const {email} = req.body;

    try {
        
        
    // Verificar el cliente
    let cliente = await Cliente.findOne({email});

    if(cliente)
        return res.status(400).json({
            msg: 'El cliente ya existe'
        });

    // Crear cliente con el modelo
    cliente = new Cliente(req.body);
    cliente.creation = moment().format('DD/MM/YYYY hh:mm:ss');
   

    // Crear el cliente en la DB
    await cliente.save();

    // Generar el response 
    return res.status(201).json({
        _id: cliente._id
    })


    } catch (error) {
            return res.status(500).json({
                msg: 'El servicio no se executó correctamente'
            })
    }
   
}

const modificarCliente = async (req, res = response) => {

   
    const _id = req.params.id;
    const body = req.body;
    try {
        
    // Verificar el cliente
    let clienteAux = await Cliente.findOne({email: body.email})
    
    if(clienteAux !== null){
        if(!clienteAux._id.equals(_id))
        return res.status(400).json({
            msg: 'Ya hay un cliente con ese correo'
        });
    }
    body.creation = moment().format('DD/MM/YYYY hh:mm:ss');
    let cliente = await Cliente.findByIdAndUpdate(_id, body, {new: true});
   
    // Generar el response 
    return res.status(201).json(cliente)


    } catch (error) {
            return res.status(500).json({
                msg: 'El servicio no se executó correctamente'
            })
    }

}


const eliminarCliente = async (req, res = response) => {

    const _id = req.params.id;

    try {
        
    // Verificar el cliente
    let cliente = await Cliente.findOne({_id});
    
    if(!cliente)
        return res.status(400).json({
            msg: 'Ese cliente no existe'
        });

    // Eliminamos al cliente de la BD
    await cliente.deleteOne(cliente._id);

    // Generar el response 
    return res.status(201).json({
        ok: 'ok'
    })


    } catch (error) {
            return res.status(500).json({
                msg: 'El servicio no se executó correctamente'
            })
    }

}

const getClientes = async (req, res = response) => {
   try {
       // Simple método que retorna una lista de clientes
       const data =  await Cliente.find();
       res.status(200).json(data);
   } catch (error) {
    return res.status(500).json({
        msg: 'El servicio no se executó correctamente'
    })
   }
}

const getClienteById = async (req, res = response) => {
        const _id = req.params.id;
    try {
        // Retorna al usuario consultado
        const data =  await Cliente.findById({_id});
        res.status(200).json(data);
    } catch (error) {
     return res.status(500).json({
         msg: 'El servicio no se executó correctamente'
     })
    }
 }


module.exports = {
    crearCliente,
    modificarCliente,
    eliminarCliente,
    getClientes,
    getClienteById
}