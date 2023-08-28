exports.inicio = (req, res) => {
    mostrarRecuadro = false;
    res.render("home", { tit: "", cont: "", mostrarRecuadro });
};

exports.form = (req, res) => {
    res.render("formulario");
};
