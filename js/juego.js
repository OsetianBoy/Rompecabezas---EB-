var instrucciones = ["Arma una imagen, ocupando la pieza vacia:", "arriba", "abajo", "izquierda", "derecha"];
var movimiento = []
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(instrucciones) {
  for (var i = 0; i < instrucciones.length; i++) {
    mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
  }
}

function agregarUltimaDireccion(direccion) {
  console.log(direccion);
  movimiento.push(direccion);
  actualizarUltimoMovimiento(direccion);
}

function chequearSiGano() {
  var grillaOrdenada = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  for (var i = 0; i < grilla.length; i++) {
    for (var j = 0; j < grilla.length; j++) {
      if (grillaOrdenada[i][j] !== grilla[i][j]) {
        return false;
      } 
    }
  }
  return true;
}


function mostrarCartelGanador() {
  if (chequearSiGano) {
    console.log(alert("Ganaste!"));
  } else {
    return false;
  }
}

function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
  var provisional = grilla[filaPos1][columnaPos1];
  grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
  grilla[filaPos2][columnaPos2] = provisional;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
  filaVacia = nuevaFila;
  columnaVacia = nuevaColumna;
}


function posicionValida(fila, columna) {
  if (((fila > 2) || (fila < 0)) || ((columna > 2) || (columna < 0))) {
    return false;
  } else {
    return true;
  }
}

function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }

  else if (direccion === codigosDireccion.DERECHA) {
    nuevaColumnaPiezaVacia = columnaVacia - 1;
    nuevaFilaPiezaVacia = filaVacia;
  }

  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaColumnaPiezaVacia = columnaVacia + 1;
    nuevaFilaPiezaVacia = filaVacia;
  }

  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
    intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

    agregarUltimaDireccion(direccion);
  }
}

var codigosDireccion = {
  IZQUIERDA: 37,
  ARRIBA: 38,
  DERECHA: 39,
  ABAJO: 40
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.textContent = '↑';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.textContent = '↓';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.textContent = '→';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.textContent = '←';
      break;
  }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}


function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }

  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
  codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
  ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function () {
    mezclarPiezas(veces - 1);
  }, 100);
}

function capturarTeclas() {
  document.body.onkeydown = (function (evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if (gano) {
        setTimeout(function () {
          mostrarCartelGanador();
        }, 500);
      }
      evento.preventDefault();
    }
  })
}

function iniciar() {
  mostrarInstrucciones(instrucciones);
  mezclarPiezas(30);
  capturarTeclas();
}

iniciar();