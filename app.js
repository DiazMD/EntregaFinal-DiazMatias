const productosArray = [
    {
        id: "celular-01",
        titulo: "Samsung Galaxy S23 ULTRA",
        imagen: "./img/S23-Ultra.png",
        precio: 489000,
        categoria: {
            titulo: "Celulares",
            id: "celulares"
        }
    },
    {
        id: "celular-02",
        titulo: "Samsung Galaxy A54",
        imagen: "./img/A54.png",
        precio: 184500,
        categoria: {
            titulo: "Celulares",
            id: "celulares"
        }
    },
    {
        id: "monitor-01",
        titulo: "Monitor Samsung 27''",
        imagen: "./img/MonitorSamsung27.png",
        precio: 78999,
        categoria: {
            titulo: "Monitores",
            id: "monitores"
        }
    },
    {
        id: "monitor-02",
        titulo: "Monitor Samsung 24''",
        imagen: "./img/MonitorSamsung24.png",
        precio: 61000,
        categoria: {
            titulo: "Monitores",
            id: "monitores"
        }
    },
    {
        id: "celular-03",
        titulo: "Motorola Edge 30 Neo",
        imagen: "./img/Motorola30Edgeneo.png",
        precio: 149999,
        categoria: {
            titulo: "Celulares",
            id: "celulares"
        }
    },
    {
        id: "auricular-01",
        titulo: "Auriculares Galaxy Buds 2",
        imagen: "./img/GalaxyBuds2.png",
        precio: 36999,
        categoria: {
            titulo: "Auriculares",
            id: "auriculares"
        } 
    },
    {
        id: "auricular-02",
        titulo: "Xiaomi Redmi Buds 3",
        imagen: "./img/XiaomiRedmiBuds3.png",
        precio: 13999,
        categoria: {
            titulo: "Auriculares",
            id: "auriculares"
        } 
    },
    {
        id: "celular-04",
        titulo: "Moto G72",
        imagen: "./img/MotoG72.png",
        precio: 119999,
        categoria: {
            titulo: "Celulares",
            id: "celulares"
        } 
    }
]

let productosCarrito = []

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
    console.log(botonesAgregar)
}

printProductos(productosArray);

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
}

// Carrito
const containerProductosCarrito = document.querySelector(".container-productos-carrito");
const accionesCarrito = document.querySelector(".acciones-carrito");
const containerEstadoCarrito = document.querySelector(".containerEstadoCarrito");
const estadoCarrito = document.querySelector(".estadoCarrito")

function mostrarCarrito(){
    containerProductosCarrito.innerHTML="";
if(productosCarrito.length > 0){    
    productosCarrito.forEach(producto => {
        let listadoProductos = document.createElement("div");
        listadoProductos.classList.add("productos-carrito")
        listadoProductos.innerHTML=`
        <div><h3 class="titulo-producto">${producto.titulo}</h3></div>
        <div><h4 class="precio-producto">Precio: $${producto.precio}</h4></div>
        <div><button type="button" class="btn btn-outline-primary">Eliminar</button></div>
        `

        containerProductosCarrito.appendChild(listadoProductos);
        estadoCarrito.remove()
        })
    } if(productosCarrito.length > 0 && productosCarrito.length <= 1){ 
        let botonesCarrito = document.createElement("div")
        botonesCarrito.innerHTML=`
        <button type="button" class="boton-comprar" id="btnComprar">Comprar</button>
        <button type="button" class="boton-vaciar-carrito" id="btnVaciarCarrito">Vaciar carrito</button>
        `
        accionesCarrito.appendChild(botonesCarrito)}
        //crearBotones();
    }
mostrarCarrito();


const containerForm = document.querySelector ("#container-form");
const btnComprar = document.querySelector("#btnComprar");
const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");

btnComprar.addEventListener("click", () => desplegarFormCompra());
btnVaciarCarrito.addEventListener("click", () => vaciarCarrito());
function desplegarFormCompra(){
    if(productosCarrito.length > 0){
    let formCompra = document.createElement("div")
    formCompra.innerHTML=`
    <h3>Formulario de Contacto</h3>
    <label>Nombre y Apellido</label>
    <input type="text" class="form-control" id="inputName" placeholder="Ingrese su Nombre y Apellido">
    <label>Correo Electrónico</label>
    <input type="email" class="form-control" id="inputEmail" placeholder="Ingrese su E-mail">
    <div class="container-formulario">

        <button type="submit" class="btn btn-secondary">Comprar y Enviar Información</button>
    </div>`
    containerForm.append(formCompra);
    containerProductos.remove();
    btnComprar.remove();
    btnVaciarCarrito.remove();
    tituloSeccion.innerText =`Finaliza tu compra`
    }
}

desplegarFormCompra();

function vaciarCarrito(productosCarrito){
    listadoProductos.innerHTML=``
    containerProductosCarrito.appendChild(listadoProductos);
    productosCarrito = []
}


function crearBotones() {
   const btnComprar = document.querySelector("#btnComprar");
   const btnVaciarCarrito = document.querySelector("#btnVaciarCarrito");
    btnComprar.addEventListener("click", () => desplegarFormCompra());
    btnVaciarCarrito.addEventListener("click", () => vaciarCarrito());
}