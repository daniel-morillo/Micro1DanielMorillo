let destapadas= 0
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




let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numbers = numbers.sort(() =>{return Math.random() - 0.5})
console.log(numbers)

gameNotStarted()

function gameStarted(){
    for (let i = 0; i <= 15;i++){
        let blockedcard = document.getElementById(i)
        blockedcard.disabled = false
    }
}

function getName(){
    showname = document.getElementById("namefield").value
    console.log(showname)
    if (showname != null && showname != ""){
        gameStarted()
        showedname.innerHTML = `Jugador: ${showname}`
    }
}

function countTime(){
    regret = setInterval(()=> {
        temp--
        showtime.innerHTML = "Tiempo: " + temp + " segundos."
        if (temp == 0){
            clearInterval(regret)
            blockAll()
            getPoints()
        }
    },1000)

}

function gameNotStarted(){
    for (let i = 0; i <= 15;i++){
        let blockedcard = document.getElementById(i)
        blockedcard.disabled = true
        blockedcard.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
    }
}

function blockAll(){
    for (let i = 0; i <= 15;i++){
        let blockedcard = document.getElementById(i)
        blockedcard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="UNI">`
        blockedcard.disabled = true
    }
    
}

function getPoints(){
    if (success == 8){
        points = Math.round(800 + 800 * (temp/180))
    } else {
        points = 100 * success
    }
    showpoints.innerHTML = `Puntación: ${points}`
    guardarPuntuacion(showname,points)
}




function uncover(id){
    
    destapadas ++
    
    if (timer == false){
        countTime()
        timer = true
    }
    
    
    if (destapadas == 1){
        card1 = document.getElementById(id-1)
        firstResult = numbers[id-1]
        card1.innerHTML = `<img src="./images/${firstResult}.png" alt="UNI">`
        
        card1.disabled = true
    }
    else if (destapadas == 2){
        card2 = document.getElementById(id-1)
        secondResult = numbers[id-1]
        card2.innerHTML = `<img src="./images/${secondResult}.png" alt="UNI">`

        card2.disabled = true
        moves ++
        showmoves.innerHTML = "Movimientos: " + moves
        
        if (firstResult == secondResult){
            destapadas = 0
            success ++;
            showsuccess.innerHTML = "Aciertos: " + success
            
            if (success == 8){
                clearInterval(regret)
                showmoves.innerHTML = `Movimientos: ${moves}!!!!!`
                showsuccess.innerHTML = "Aciertos: " + success + "!!!!"
                showtime.innerHTML = `Tardaste un total de: ${180-temp} segundos`
                getPoints()
            }
        } else {
            
            setTimeout(() =>{
                card1.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
                card2.innerHTML = `<img src="./images/Britannia.png" alt="Reverso">`
                card1.disabled = false
                card2.disabled = false
                destapadas = 0
            },1000)
        }
    }
    
}



// Función para guardar la puntuación en localStorage
function guardarPuntuacion(nombre, puntuacion) {
    // Obtener la lista actual de puntuaciones desde localStorage

    let puntuaciones = JSON.parse(localStorage.getItem('puntuaciones')) || [];
  
    // Agregar la nueva puntuación a la lista
    puntuaciones.push({ nombre: nombre, puntuacion: puntuacion });
  
    // Ordenar la lista de mayor a menor puntuación
    puntuaciones.sort((a, b) => b.puntuacion - a.puntuacion);
  
    // Limitar la lista a un máximo de 10 puntuaciones
    puntuaciones = puntuaciones.slice(0, 10);
  
    // Guardar la lista actualizada en localStorage
    localStorage.setItem('puntuaciones', JSON.stringify(puntuaciones));
  }
  
  
  // Obtener la lista de puntuaciones desde localStorage
  const puntuacionesGuardadas = JSON.parse(localStorage.getItem('puntuaciones'));

  // Crear un objeto para almacenar el puntaje más alto de cada jugador
  const puntajesMaximos = {};
  
  // Obtener el puntaje máximo de cada jugador
  puntuacionesGuardadas.forEach(puntuacion => {
    const nombre = puntuacion.nombre;
    const puntuacionActual = puntuacion.puntuacion;
  
    if (!puntajesMaximos[nombre] || puntuacionActual > puntajesMaximos[nombre]) {
      puntajesMaximos[nombre] = puntuacionActual;
    }
  });
  
  // Obtener el elemento de la lista en el DOM
  const puntuacionesLista = document.getElementById('puntuaciones-lista');
  
  // Limpiar el contenido previo de la lista
  puntuacionesLista.innerHTML = '';
  
  // Mostrar la lista de puntuaciones en el DOM
  Object.keys(puntajesMaximos).forEach((nombre, indice) => {
    const li = document.createElement('li');
    li.textContent = `${indice + 1}. ${nombre}: ${puntajesMaximos[nombre]}`;
    puntuacionesLista.appendChild(li);
  });

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
