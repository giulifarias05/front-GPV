const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

//Carga de variables de entorno
dotenv.config({ path: "./config.env" });
//const DB = `mongodb+srv://tbbecchi:${process.env.DATABASE_PASSWORD}@clusterchatgpt.islb83v.mongodb.net/test`;
//Conexión al cloud de Mongodb Atlas
mongoose
    .connect(
        `mongodb+srv://tbbecchi:contraseña@clusterchatgpt.lwicrq6.mongodb.net/test`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then((con) => {
        //console.log(con.connections);
        console.log("Connected to database");
    });

const port = 3000;
//Corremos el servidor en el puerto seleccionado
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
