texto = `{
  "--titulo": "Sonic y la batalla contra los Minions--finTitulo",
  "--contenido": "Había una vez en el mundo de Sonic, donde nuestro valiente erizo azul se encontró con una horda de traviesos Minions. Estos diminutos seres amarillos, conocidos por su travesura y lealtad al villano Gru, se habían unido para causar caos en Green Hill Zone. Sonic, decidido a detener su malvado plan, se enfrentó valientemente a los Minions en una épica batalla. Velocidad y astucia se mezclaron en una danza frenética mientras Sonic esquivaba los ataques de los Minions y contraatacaba con sus icónicos movimientos de giro y sus rápidos ataques. La lucha se intensificó cuando los Minions desplegaron su ingenio y trataron de superar al veloz erizo con trampas y trucos maliciosos. Sin embargo, Sonic demostró ser un verdadero héroe, superando todos los obstáculos y derrotando a los Minions uno por uno. Al final, el heroico erizo logró salvar Green Hill Zone de la invasión de los Minions y restauró la paz en su hogar.--finContenido",
  "--genero": "Aventura--finGenero"
}`
const mongoose = require("mongoose");

titulo = texto.slice(texto.indexOf('--titulo') + '--titulo'.length + 4, texto.indexOf('--finTitulo'))
contenido = texto.slice(texto.indexOf('--contenido') + '--titulo'.length + 7, texto.indexOf('--finContenido'))

console.log(contenido)

