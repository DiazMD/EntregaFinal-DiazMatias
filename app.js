let productosArray = [];
let muestroError = false;
async function cargarProductos() {
    try {
        const response = await fetch('https://diazmd.github.io/preentrega3-DiazMatias/productos.json');
        const data = await response.json();
        productosArray = data;
        printProductos(productosArray);
    } catch (error) {
       console.error(error);
        alert('Ha ocurrido un error!');
    }
  }
 
let productosCarrito = []
productosCarrito = JSON.parse(localStorage.getItem("productos-carrito")) || [];
let montoTotal = ""

const containerProductos = document.querySelector("#container-productos");
const botonesSecciones = document.querySelectorAll(".boton-seccion")
const tituloSeccion = document.querySelector(".titulo-seccion")
let botonesAgregar = document.querySelectorAll(".boton-agregar")

function filtrarProductos(productosArray){
    const inputSearch = document.querySelector(".inputSearch");
    const textoBuscado = inputSearch.value.toLowerCase()
    const productosFiltrados = productosArray.filter(
        producto => producto.titulo.toLowerCase().includes(textoBuscado)|| producto.categoria.titulo.toLowerCase().includes(textoBuscado)
    )
    return productosFiltrados;
}
 
function printProductos(productosArray) {
const productosFiltrados = filtrarProductos(productosArray);

    containerProductos.innerHTML="";

    productosFiltrados.forEach(producto => {        
        const div = document.createElement("div");
        div.classList=("card-producto");
        div.innerHTML=`
        <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
        <h2 class="titulo-producto">${producto.titulo}</h2>
        <p class="precio-producto">$${producto.precio}</p>
        <button class="boton-agregar" id="${producto.id}">Agregar</button>
        `
    containerProductos.append(div)    
    });

    actualizarBotonesAgregar();
}

// Filtrado por busqueda

const inputSearch = document.querySelector("#inputSearch")

inputSearch.addEventListener("keyup", () => printProductos(productosArray))

// Filtrado por secciones
botonesSecciones.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        const productoTitulo = productosArray.find(producto => producto.categoria.id === e.currentTarget.id);
        tituloSeccion.innerText = productoTitulo.categoria.titulo;

        const productosPorSeccion = productosArray.filter(producto => producto.categoria.id === e.currentTarget.id)
        printProductos(productosPorSeccion);
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".boton-agregar")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    })
};

function agregarCarrito(e){
    const idBoton = e.currentTarget.id
    const productoAgregado = productosArray.find(producto => producto.id === idBoton)

    if(productosCarrito.some(producto => producto.id === idBoton)){
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
    }

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito))
 console.log(productosCarrito);
 mostrarCarrito();
 mensajeAgregadoAlCarrito();
}



// Carrito
const containerProductosCarrito = document.querySelector(".container-productos-carrito");
const accionesCarrito = document.querySelector(".acciones-carrito");
const containerEstadoCarrito = document.querySelector(".containerEstadoCarrito");
const estadoCarrito = document.querySelector(".estadoCarrito");
const containerForm = document.querySelector ("#container-form");
mostrarCarrito();
crearBotonesAccionCarrito();
function mostrarCarrito(){
    containerProductosCarrito.innerHTML="";
if(productosCarrito.length > 0){    
    productosCarrito.forEach(producto => {
        let listadoProductos = document.createElement("div");
        listadoProductos.classList.add("productos-carrito")
        listadoProductos.innerHTML=`
        <div><h3 class="titulo-producto">${producto.titulo}</h3></div>
        <h3 class="titulo-producto"> x ${producto.cantidad} </h3></div>
        <div><h3 class="precio-producto">Precio: $${producto.precio}</h3></div>
        `
        containerProductosCarrito.appendChild(listadoProductos);
        estadoCarrito.remove()
        btnComprar.classList.replace("boton-deshabilitado","boton-comprar");
        btnVaciarCarrito.classList.add("boton-deshabilitado","boton-vaciar-carrito");
        })
    } else {
        estadoCarrito.innerHTML=`
        <em class="estadoCarrito">Su carrito esta vacio...</em>`
        containerEstadoCarrito.appendChild(estadoCarrito);
        btnComprar.classList.replace("boton-comprar", "boton-deshabilitado");
        btnVaciarCarrito.classList.replace("boton-vaciar-carrito", "boton-deshabilitado");
    }
}

function desplegarFormCompra(){
    if(productosCarrito.length > 0){   
        mostrarMontoTotal(); 
        let containerCarrito = document.querySelector(".container-carrito");
        let mostrarMonto = document.createElement("div");
        mostrarMonto.classList.add("productos-carrito");
        mostrarMonto.innerHTML=`
        <h4 class="titulo-producto">Total: $${montoTotal}</h4></div>`
        containerCarrito.appendChild(mostrarMonto);

    let formCompra = document.createElement("div")
    formCompra.innerHTML=`
    <h3>Formulario de Contacto</h3>
    <label>Nombre y Apellido</label>
    <input type="text" class="form-control" id="inputName" placeholder="Ingrese su nombre y apellido">
    <label>Correo Electrónico</label>
    <input type="email" class="form-control" id="inputEmail" placeholder="Ingrese su E-mail">
    <div class="container-formulario">

        <button type="submit" class="btn btn-secondary" id="finalizar-compra">Finalizar compra</button>
    </div>`
    mostrarCarrito();
    containerForm.append(formCompra);
    containerProductos.remove();
    btnComprar.remove();
    btnVaciarCarrito.remove();
    tituloSeccion.innerText =`Finaliza tu compra`
}
}

function crearBotonesAccionCarrito() {
const btnComprar = document.querySelector("#btnComprar");
const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");
btnComprar.addEventListener("click", () => desplegarFormCompra());
btnVaciarCarrito.addEventListener("click", () => alertaVaciar());
}

function mostrarMontoTotal(){
montoTotal = productosCarrito.reduce((acumulado, producto)=>{
    return acumulado + producto.precio*producto.cantidad
},0);
}

let formulario = document.querySelector("#container-form");
let containerTitulo = document.querySelector("#container-titulo");


formulario.addEventListener("submit", enviarFormulario);

function enviarFormulario(e){
  e.preventDefault();
    const nombre = document.querySelector("#inputName");
    const email = document.querySelector("#inputEmail");
    const finalizarCompra = document.querySelector("#finalizar-compra");
    containerCarrito = document.querySelector(".container-carrito");
    formulario = document.querySelector("#container-form");
    const alertCompra = document.createElement("div");
    if (nombre.value != "" && email.value != ""){
    alertCompra.classList.add("compra-exitosa");
    alertCompra.innerHTML = `<em>${nombre.value} su compra fue realizada exitosamente. Se enviara la factura a ${email.value}<em>`
    tituloSeccion.innerText = "Compra exitosa.";
    containerTitulo.appendChild(alertCompra);
    productosCarrito = [];
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    finalizarCompra.remove();
    estadoCarrito.remove();
    containerCarrito.remove();
    containerForm.remove();
    } else {
        if (!muestroError) {
            muestroError = true;
            alertCompra.classList.add("compra-fallida");
            alertCompra.innerHTML = `<em>Debe completar los campos obligatoriamente para finalizar.<em>`
        }
        
        formulario.appendChild(alertCompra);
    }
};


function alertaVaciar(){
    if(productosCarrito.length > 0){ 
    swal.fire({
        title: '¡Cuidado!',
        text: '¿Estás seguro que deseas vaciar tu carrito?',
        icon: 'warning',
        iconColor: "orange",
        confirmButtonText: 'Si',
        confirmButtonColor: `#1A8F1A`,
        showCancelButton: "true",
        cancelButtonText: `No`,
        cancelButtonColor: `#d9230f`,
      }).then((result) => {
        if(result.isConfirmed){
            vaciarCarrito()
        }
      })
    }
}

function vaciarCarrito(){
    productosCarrito = [];
    mostrarCarrito();
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

function mensajeAgregadoAlCarrito(){
    Toastify({
        text: "Agregado al carrito",
        duration: 1000, 
        style: {
            background: "#1AC247",
          }
        }).showToast();
}

cargarProductos();