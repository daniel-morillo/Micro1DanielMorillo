//Declaración de variables
let destapadas = 0
let card1 = null
let card2 = null
let firstResult = null
let secondResult = null
let moves = 0
let success = 0
let timer = false
let temp = 180
let regret = null
let points = 0
let puntajes = []
let showmoves = document.getElementById("moves")
let showsuccess = document.getElementById("hits")
let showtime = document.getElementById("time")
let showedname = document.getElementById("name")
let showname = null
let showpoints = document.getElementById("points")



//Se generan números duplicados los cuales se emparejan con los id de los botones en la tabla y se mezclan randomizadamente
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
numbers = numbers.sort(() => { return Math.random() - 0.5 })
console.log(numbers)

gameNotStarted()
showLeaders()

//Habilita todas las cartas
function gameStarted() {
    for (let i = 0; i <= 15; i++) {
        let blockedcard = document.getElementById(i)
        blockedcard.disabled = false
    }
}

//Obtiene el nombre y comienza el juego, también no permite que se toquen las cartas antes de mponer un nombre en el input
function getName() {
    showname = document.getElementById("namefield").value
    console.log(showname)
    if (showname != null && showname != "") {
        gameStarted()
        showedname.innerHTML = `Jugador: ${showname}`
    }
}

//El timer, si el tiempo llega a 0, cuenta los puntos y bloquea las tarjetas dando el juego como terminado
function countTime() {
    regret = setInterval(() => {
        temp--
        showtime.innerHTML = "Tiempo: " + temp + " segundos."
        if (temp == 0) {
            clearInterval(regret)
            blockAll()
            getPoints()
        }
    }, 1000)

}

//Bloquea todas las cartas
function gameNotStarted() {
    for (let i = 0; i <= 15; i++) {
        let blockedcard = document.getElementById(i)
        blockedcard.disabled = true
        blockedcard.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
    }
}

//Bloquea todas las cartas pero muestra las imágenes de cada una, solo se usa cuando termina el juego
function blockAll() {
    for (let i = 0; i <= 15; i++) {
        let blockedcard = document.getElementById(i)
        blockedcard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="UNI">`
        blockedcard.disabled = true
    }

}

//Obtiene los puntos del jugador
function getPoints() {
    if (success == 8) {
        //Para este calculo le agregué que cada pareja encontrada tuviera un valor de 100 puntos ya que no me parecía que si no se encontraban todas el usuario no tuviera puntos
        points = Math.round(800 + 800 * (temp / 180))
    } else {
        points = 100 * success
    }
    showpoints.innerHTML = `Puntación: ${points}`
    guardarPuntuacion(showname, points)
    showLeaders()
}



//Esta función revela la carta clickeada
function uncover(id) {

    destapadas++
//Inicia el temporizador si no se ha iniciado
    if (timer == false) {
        countTime()
        timer = true
    }

//Si es la segunda carta que se clickea y no coincide con la primera, las enseña por un segundo y después las oculta
//Si coinciden, las deja expuestas y le sube uno a los aciertos
    if (destapadas == 1) {
        card1 = document.getElementById(id - 1)
        firstResult = numbers[id - 1]
        card1.innerHTML = `<img src="./images/${firstResult}.png" alt="UNI">`

        card1.disabled = true
    }
    else if (destapadas == 2) {
        card2 = document.getElementById(id - 1)
        secondResult = numbers[id - 1]
        card2.innerHTML = `<img src="./images/${secondResult}.png" alt="UNI">`

        card2.disabled = true
        moves++
        showmoves.innerHTML = "Movimientos: " + moves

        if (firstResult == secondResult) {
            destapadas = 0
            success++;
            showsuccess.innerHTML = "Aciertos: " + success
            //El juego termina si se llega a 8 aciertos
            if (success == 8) {
                clearInterval(regret)
                showmoves.innerHTML = `Memorama Completado Crack 🤩`
                showsuccess.innerHTML = "Aciertos: " + success + "😳"
                showtime.innerHTML = `Tardaste un total de: ${180 - temp} segundos 😝`
                getPoints()
            }
        } else {

            setTimeout(() => {
                card1.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
                card2.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
                card1.disabled = false
                card2.disabled = false
                destapadas = 0
            }, 1000)
        }
    }

}



// Función para guardar la puntuación en localStorage
function guardarPuntuacion(nombre, puntuacion) {
    // Obtiene la lista ya guardada en LocalStorage

    let puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || [];

    //Guarda la nueva puntuación en la lista
    puntuaciones.push({ nombre: nombre, puntuacion: puntuacion });

    // Ordenar la lista de mayor a menor puntuación
    puntuaciones.sort((a, b) => b.puntuacion - a.puntuacion);

    // Limita la lista a 10 puntuaciones
    puntuaciones = puntuaciones.slice(0, 10);

    // Guarda la lista
    localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones));
}

function showLeaders() {
    // Obtiene la lista de puntuaciones
    const puntuacionesGuardadas = JSON.parse(localStorage.getItem('puntuaciones'));

    // Esto es para guardar los puntajes máximos de cada jugador
    const puntajesMaximos = {};

    // Obtener el puntaje máximo de cada jugador
    puntuacionesGuardadas.forEach(puntuacion => {
        const nombre = puntuacion.nombre;
        const puntuacionActual = puntuacion.puntuacion;
        //Si el puntaje obtenido es mayor que el máximo guardado anteriormente para ese jugador, lo guarda
        if (!puntajesMaximos[nombre] || puntuacionActual > puntajesMaximos[nombre]) {
            puntajesMaximos[nombre] = puntuacionActual;
        }
    });

    
    const puntuacionesLista = document.getElementById('puntuaciones-lista');

   
    puntuacionesLista.innerHTML = '';

    // Crea un elemento de la lista vacía del html por cada puntuación guardada
    Object.keys(puntajesMaximos).forEach((nombre, indice) => {
        const li = document.createElement('li');
        li.textContent = `${indice + 1}. ${nombre}: ${puntajesMaximos[nombre]}`;
        puntuacionesLista.appendChild(li);
    });
}

//Reinicia el juego
function restart() {
    destapadas = 0;
    card1 = null;
    card2 = null;
    firstResult = null;
    secondResult = null;
    moves = 0;
    success = 0;
    timer = false;
    temp = 180;
    points = 0;
    puntajes = [];

    showmoves.innerHTML = "Movimientos: 0";
    showsuccess.innerHTML = "Aciertos: 0";
    showtime.innerHTML = "Tiempo: 80 segundos";
    showedname.innerHTML = "Jugador: ";
    showpoints.innerHTML = "Puntación: 0";

    clearInterval(regret)

    numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    numbers = numbers.sort(() => Math.random() - 0.5);

    for (let i = 0; i <= 15; i++) {
        let blockedcard = document.getElementById(i);
        blockedcard.disabled = false;
        blockedcard.innerHTML = "";
    }

    gameNotStarted();
}
