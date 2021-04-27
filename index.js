const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')
require('dotenv').config();

// Acceder al dir actúal
const path = require('path');

// Creamos el servidor/app de expressjs
const app = express();

// Conexión a la base de datos
dbConnection();

// Directorio public
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cliente', require('./routes/cliente'));

// Manejo de rutas del deploy
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})


// Asignamos el puerto al BackEnd
app.set('puerto', process.env.PORT || 3000);


// Escuchamos los cambios en un puerto epecifico o el puerto de producción
app.listen(app.get('puerto'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('puerto')}`)
})