var elemento;
var frase;

function comprobarCheck() {
    check = 0;

    for (var i = 1; i <= document.querySelectorAll("#textoEncuesta label").length; i++) {
        check += recogerDatos(i);
    }

    if (check > 0 && check < 8) {
        window.open("./office.html", "_self");
    } else if (check > 7 && check < 11) {
        window.open("./design.html", "_self");
    } else if (check > 9 && check < 15) {
        window.open("./video.html", "_self");
    } else if (check > 13 && check < 22) {
        window.open("./gaming.html", "_self");
    }
}

function datosUsuario() {
    name = document.getElementById("nombre").value;
    mail = document.getElementById("mail").value;
    age = document.getElementById("age").value;

    alert("Hola " + name + ", completa la encuesta para ver que ordenador te corresponde, un saludo!");

    sessionStorage.setItem("nombreUsuario", name); //Creamos la sesión con clave - valor.
    sessionStorage.setItem("mailUsuario", mail);
    sessionStorage.setItem("edadUsuario", age);
}

function escribirDatos() {


    var name = sessionStorage.getItem("nombreUsuario"); //Recuperamos la sesión llamando a la clave.
    var mail = sessionStorage.getItem("mailUsuario");
    var age = sessionStorage.getItem("edadUsuario");

    if(name == null || name == ""){
    	name = "Usuario";
    }

    if(mail == null || mail == ""){
    	mail = "notengonada@gmail.com";
    }

    if(age == null || age < 0){
    	age = "32";
    }

    document.getElementById("escribirCosas").innerHTML = "ORDENADOR PERSONALIZADO PARA EL USUARIO: " + name + " - CORREO DE CONTACTO: " + mail + " - EDAD: " + age;
}

function recogerDatos(cual) {
    valor = 0;
    for (var i = 0; i < document.querySelectorAll('#textoEncuesta input[name = "encuesta' + cual + '"]').length; i++) {
        if (document.rellenar["encuesta" + cual][i].checked) {
            valor = parseInt(document.rellenar["encuesta" + cual][i].value);
        }
    }
    return valor;
}

function comprobarProgreso() {
    const NUMPREGUNTAS = document.querySelectorAll("#textoEncuesta label").length;
    var progreso = 0;
    /*var pregunta1 = document.getElementsByName("encuesta1");
    var pregunta2 = document.getElementsByName("encuesta2");
    var pregunta3 = document.getElementsByName("encuesta3");
    var pregunta4 = document.getElementsByName("encuesta4");*/
    var preguntas = [];
    var encontrado;

    for (var i = 0; i < NUMPREGUNTAS; i++) {
        encontrado = false;
        preguntas[i] = document.getElementsByName("encuesta" + (i + 1));
        for (var j = 0; j < preguntas[i].length && !encontrado; j++) {
            if (preguntas[i][j].checked) {
                progreso += (100 / NUMPREGUNTAS);
                encontrado = false;
            }
        }
    }
    return progreso;
}

function iniciar() {
    var botones = document.querySelectorAll("#textoEncuesta input[type = 'radio']");
    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", actualizarProgreso);
        botones[i].checked = false;
    }
    elemento = document.getElementById("cajaTexto");
    frase = "";
}

function actualizarProgreso() {
    var progress = document.getElementById("progressBar");
    progress.value = comprobarProgreso();
    if (comprobarProgreso() >= 100) {
        alert("Enhorabuena has completado la encuesta! pulsa en enviar para ver el resultado")
    }
}

function leerTecla(caracter) {
    elemento.innerHTML += caracter;
    frase += caracter;
}

function borrarLetra() {
    elemento.innerHTML = elemento.innerHTML.substring(0, elemento.innerHTML.length - 1);
    frase = frase.substring(0, frase.length - 1);
}

function enviarFrase() {
    if (frase == "encuesta") {
        window.open("./encuesta.html", "_self");
    } else if (frase == "informacion") {
        window.open("./informacion.html", "_self");
    } else if (frase == "caracteristicas") {
        window.open("./caracteristicas.html", "_self");
    }else{
    	alert("La frase introducida no está entre las permitidas!")
    }
}

window.addEventListener("load", iniciar);