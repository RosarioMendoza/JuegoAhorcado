//Declaracion de Variables

//palabras
let palabras = [ ["Quemarropa", "De muy cerca"], ["Lamentable", "disgusto"], ["Inmortal", "Ser que no muere"], ["Satisfacer", "Accion de saciar"], ["Ballena", "Animal Marino"], ["Acampar", "Actividad en la naturaleza"], ["Leviticos", "Un libro de la biblia"], ["Jirafa", "Un animal"], ["Llaves", "Abre puertas"], ["Eden", "Paraiso Biblico"], ["Abundante", "Mucho"], [ "Confortable","Comodo"], ["Enfurecer", "muy enojado"], ["Olivo", "Un árbol"], ["Atacama", "Un desierto"], ["Catatumbo", "un relampago"], ["Elefante", "Un animal"], ["Indonesia", "Un país"], ["Chinpance", "una especie"], ["ilustracion", "Representación gráfica"], ["Inteligencia", "Sabiduria"], ["Matrimonio", "Boda"], ["Escuela", "Casa educativa"], ["Fragmento", "Un pedazo"], ["Diferente", "Raro"]];
// Palabra a averiguar
let palabra = "";
// Numeros
let rand;
// Palabras ocultas
let oculta = [];
// Elemento html de la palabra
let hueco = document.getElementById("palabra");
// Numero de Intentos en el contador
let cont = 6;
// abecedario en los botones
let buttons = document.getElementsByClassName('letra');




// Palabras al azar
function generaPalabra() {
  rand = (Math.random() * 24).toFixed(0);
  palabra = palabras[rand][0].toUpperCase();
}

// Funcion para pintar los guiones de cada palabra
function generaGuiones(cantidad_letras) {
  for (var i = 0; i < cantidad_letras; i++) {
    oculta[i] = "_";
  }
  hueco.textContent = oculta.join("");
}

//Generar abecedario
function generaAlfabeto(a,z) { 
  var i = a.charCodeAt(0);
  var j = z.charCodeAt(0);

  let letra = "";

  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("alfabeto").innerHTML += `
      <button value='${letra}' onclick='intento(\"${letra}\")' class='btn btn-primary mt-1 letra' id='${letra}'> ${letra} </button>
      <span>&nbsp;</span>
    `;
  }
}

//  intentos
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(let i=0; i<palabra.length; i++) {
      
      if(palabra[i]==letra) {
        oculta[i] = letra; //Reemplaza el guion por la letra
      }
    }
    hueco.innerHTML = oculta.join("");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Acertaste &#128076',
      showConfirmButton: false,
      timer: 1500
    });
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Fallaste &#128554',
      showConfirmButton: false,
      timer: 1500
    });
    document.getElementById("image"+cont).className += "fade-in";
  }
  compruebaFin();
}

// Para Obtener obtenerAyuda
function obtenerAyuda() {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: palabras[rand][1],
    showConfirmButton: false,
    timer: 1500
  });
}

// Comprobar si ya ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    Swal.fire({
      title: 'GANASTE!',
      imageUrl: "./img/final-ganador.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonText:"Reiniciar Juego"
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }else if( cont == 0 ) {
    Swal.fire({
      title: 'PERDISTE!',
      imageUrl: "./img/final-perdedor.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      confirmButtonText:"Intentalo de Nuevo"
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
}

function recargar(){
  location.reload();
}

// Iniciar juego
function inicio() {
  generaPalabra();
  generaGuiones(palabra.length);
  generaAlfabeto("a","z");
  cont = 6;
  document.getElementById("intentos").innerHTML=cont;
}

// Iniciar todo en ventana 
window.onload = inicio();

