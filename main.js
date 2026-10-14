/*
    Cargar comidas en memoria desde el JSON
*/
/*
    Cargar comidas en memoria desde el JSON
*/
fetch('./data/comidas-extended.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidasConForEach(comidas);
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });

let comidas = [];

const container = document.getElementById('comidaContainer');

function mostrarComidasConForEach(lista = comidas) {

 container.innerHTML="" ; 

  lista.forEach( tarjeta => {
    container.innerHTML +=
`
  <article class="card">
        <h2 class="comida">${tarjeta.nombre}</h2>
        <p>${tarjeta.provincia}</p>
        <span class ="categoria">${tarjeta.categoria}</span>
        <ul>
         ${tarjeta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')} 
        </ul>
</article>
`
  })
}
mostrarComidasConForEach();

const comidaNueva = document.getElementById("agregarComida");

comidaNueva.addEventListener("submit", (event) => {
  event.preventDefault();
  //alert("Comida nueva recibida" + event.target.nombre.value);
  let nuevaComida = {
   nombre: event.target.nombre.value, 
   categoria: event.target.categoria.value,  
   provincia: event.target.provincia.value,
   ingredientes: event.target.ingredientes.value.split(","),
  }

  comidas.push(nuevaComida)

  mostrarComidasConForEach()

  event.target.reset()
})

const buscador = document.getElementById("buscador")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroProvincia = document.getElementById("filtroProvincia")

function filtrar(){
  const comidasFiltradas = comidas.filter( comida => { 
    return comida.categoria.includes(filtroCategoria.value)
        && comida.provincia.includes(filtroProvincia.value)
  })

  mostrarComidasConForEach(comidasFiltradas)
}

function buscar(){
const texto = buscador.value.toLowerCase()

const comidasFiltradas = comidas.filter(comida => {
  return comida.nombre.toLowerCase().includes(texto)
      || comida.provincia.toLowerCase().includes(texto)
      || comida.categoria.toLowerCase().includes(texto)
})
mostrarComidasConForEach(comidasFiltradas)
}

filtroCategoria.addEventListener("change", filtrar)
filtroProvincia.addEventListener("change", filtrar)
buscador.addEventListener("input", buscar)

