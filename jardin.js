const jardin = document.getElementById("jardin");
const anchoPantalla = window.innerWidth;
const altoPantalla = window.innerHeight;
const numeroFlores = 30; // más flores para el paisaje
const flores = [];

function distanciaFlores(x1, x2, y1, y2){
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Crear flor con posición X y posición Y en el suelo, además de escala y colores
function crearFlor(x, y, scale) {
  const flor = document.createElement("div");
  flor.className = "flor-contenedor";
  flor.style.position = "absolute";
  flor.style.left = `${x}px`;
  flor.style.bottom = `${y}px`;  // importante que sea bottom para estar en "suelo"
  flor.style.transform = `scale(${scale})`;

  const [petaloClaro, petaloOscuro] = colorAleatorioPetalo();
  const [centroClaro, centroOscuro] = colorAleatorioCentro();

  flor.innerHTML = `
    <div class="flor">
      ${[...Array(6)].map(() => `
        <div class="petalo" style="background: radial-gradient(circle, ${petaloClaro}, ${petaloOscuro});"></div>
      `).join('')}
      <div class="centro" style="background: radial-gradient(circle, ${centroClaro}, ${centroOscuro});"></div>
    </div>
    <div class="tallo"></div>
  `;

  jardin.appendChild(flor);
}

// Parámetros para el "suelo"
const alturaSueloBase = 20; // altura mínima del suelo
const alturaVariacion = 20; // variación de altura para simular terreno irregular

// Centro a evitar (dejas libre ese espacio en el medio)
const centroX = anchoPantalla / 2;
const radioExclusion = 120;

// Comprobamos si podemos poner la flor sin que esté muy cerca de otras y fuera del centro excluido
function puedeColocarFlor(x, y) {
  // No cerca del círculo central
  if (Math.abs(x - centroX) < radioExclusion) return false;

  // No muy cerca de otras flores
  for (const flor of flores) {
    if (distanciaFlores(x, flor.x, y, flor.y) < 80) {
      return false;
    }
  }
  return true;
}

// Creamos el campo de flores
function crearCampoFlores() {
  let intentos = 0;
  while (flores.length < numeroFlores && intentos < 1000) {
    intentos++;

    const x = Math.random() * (anchoPantalla - 100) + 50; // para que no queden pegadas a bordes
    const y = alturaSueloBase + Math.random() * alturaVariacion;
    const scale = 0.5 + Math.random() * 0.7;

    if (puedeColocarFlor(x, y)) {
      flores.push({x, y});
      crearFlor(x, y, scale);
    }
  }
}
// Colores para los pétalos (suaves pero con vida)
function colorAleatorioPetalo() {
  const colores = [
    ['#e07a87', '#bf4c65'], // rosa suave pero vivo
    ['#ecb495', '#d67c57'], // salmón cálido
    ['#82a8d7', '#5a7ab7'], // azul medio, vibrante
    ['#82b07f', '#4f794f'], // verde fresco y natural
    ['#a68cc1', '#7e5eb3'], // púrpura con energía
    ['#d4b37f', '#a9874a'], // beige con calidez
    ['#e0a7af', '#bf7584']  // rosa palo más vivo
  ];
  return colores[Math.floor(Math.random() * colores.length)];
}

// Colores para el centro (suaves y cálidos)
function colorAleatorioCentro() {
  const centros = [
    ['#e4cc58', '#c19b29'], // amarillo cálido y suave
  ];
  return centros[Math.floor(Math.random() * centros.length)];
}


// Limpiar jardín antes de crear (por si quieres actualizar luego)
jardin.innerHTML = "";

// Crear las flores
crearCampoFlores();

// --- Animación lluvia ---
const lluvia = document.getElementById("lluvia");
const numFrases = 100;

const frases = [
  "Te amo",
  "Te quiero",
  "Me encantas",
  "Te adoro"

];

for (let i = 0; i < numFrases; i++) {
  const fraseDiv = document.createElement("div");
  fraseDiv.classList.add("gota");
  
  // Posición horizontal aleatoria
  fraseDiv.style.left = `${Math.random() * window.innerWidth}px`;
  
  // Duración y retraso aleatorios para animación
  fraseDiv.style.animationDuration = `${3 + Math.random() * 3}s`;
  fraseDiv.style.animationDelay = `${Math.random() * 5}s`;
  
  // Texto aleatorio
  const texto = frases[Math.floor(Math.random() * frases.length)];
  fraseDiv.textContent = texto;
  
  lluvia.appendChild(fraseDiv);
}


const pasto = document.createElement('div');
pasto.className = 'pasto';

for(let i = 0; i < 200; i++) {
  const hoja = document.createElement('div');
  hoja.className = 'hoja-pasto';
  hoja.style.setProperty('--i', i);
  pasto.appendChild(hoja);
}

document.body.appendChild(pasto);
