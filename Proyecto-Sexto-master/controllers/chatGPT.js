const openai = require("../models/openai");
const cuento = require("../models/myModels");
const { jsPDF } = require("jspdf");
const fs = require("fs");
const path = require("path");

//responde con un objeto de js en el que haya llave'contenido'quesea un cuento,llave'titulo'el cual sea un titulo,llave'tag'en la que me des un arreglo con 3 tags relacionados,llave'genero'en la que clasifiques el cuento con algun genero:
exports.consulta = (req, res, message, genero, longitud) => {
    const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "imagenes",
        "hola.jpeg"
    );

    openai
        .createCompletion({
            model: "text-davinci-003",
            prompt:
                `quiero que me generes un cuento ${longitud} de ${genero} en base a mis claves tenga:
        "--titulo--"{genera titulo de cuento}"--fintitulo--"
        "--contenido--"{genera cuento}"--fincontenido--"` + message,
            temperature: 0.9,
            max_tokens: 3900,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [" Human:", " AI:"],
        })
        .then((response) => {
            const mitexto = response.data.choices[0].text;
            const texto = mitexto.toLowerCase();
            const titulo = texto.slice(
                texto.indexOf(
                    "--titulo--"
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                ) + "--titulo--".length,
                texto.indexOf(
                    "--fintitulo--"
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                )
            );
            const contenido = texto.slice(
                texto.indexOf(
                    "--contenido--"
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                ) + "--contenido--".length,
                texto.indexOf(
                    "--fincontenido--"
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                )
            );
            const genero = texto.slice(
                texto.indexOf("--genero") + "--genero".length + 7,
                texto.indexOf("{--fingenero")
            );
            const miCuento = new cuento({
                titulo: `${titulo}`,
                prompt: message,
                contenido: `${contenido}`,
                fecha: new Date(),
            });

            miCuento.save();

            TextoPDF(texto, imagePath);
            const mostrarRecuadro = true;
            res.render('home', {tit : titulo, cont : contenido, mostrarRecuadro});
        });
};

function TextoPDF(texto, imagePath) {
    // Eliminar la etiqueta "--titulo--"
    texto = texto.replace("--titulo--", "");

    if (fs.existsSync(imagePath)) {
        const doc = new jsPDF();
        doc.setFont("Verdana");

        const textX = 15;
        const textY = 15;

        const lines = doc.splitTextToSize(texto, 180);
        const textHeight = lines.length * 10;

        doc.text(lines, textX, textY);

        const imageWidth = 80;
        const imageHeight = 80;

        const imageX = textX;
        const imageY = doc.internal.pageSize.height - imageHeight - 10;

        const imageData = fs.readFileSync(imagePath);
        const base64Image = imageData.toString("base64");
        doc.addImage(
            base64Image,
            "JPEG",
            imageX,
            imageY,
            imageWidth,
            imageHeight
        );

        doc.save("cuento.pdf");

        console.log("El archivo PDF ha sido creado correctamente.");
    } else {
        console.error(
            "La imagen no se encuentra en la ruta especificada:",
            imagePath
        );
        return;
    }
}
