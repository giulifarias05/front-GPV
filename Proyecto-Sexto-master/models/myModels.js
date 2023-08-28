//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const postSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: false
    },
    longitud: {
        type: Number,
        required: false
    },
    idioma: {
        type: String,
        required: false
    },
    tags: {
        type: Array,
        required: false,
    },
    prompt: {
        type: String,
        required: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: false,
    },
    genero: {
        type: String,
        required: false,
    },
    fecha: {
        type: Date,
        required: true,
    },
    recomendaciones: {
        type: Array,
        required: false
    }
});

//Creación del modelo Post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
