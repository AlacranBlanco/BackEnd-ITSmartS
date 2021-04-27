const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

    } catch (error) {
        throw new Error('Error al conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}