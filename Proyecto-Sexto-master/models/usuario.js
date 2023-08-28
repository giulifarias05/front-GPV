//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const postSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    idioma: {
        type: String,
        required: true,
    },
    historial: {
        type: Array,
        required: true,
    },
    favoritos: {
        type: Array,
        required: true,
    },
});

//Creación del modelo Post
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
