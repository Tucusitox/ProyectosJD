//--------------------- ANIMACION D ELOS PRODUCTOS -----------------//
function escalaProducto(element) {
    let contenedor = element.parentElement.nextElementSibling;
    let producto = contenedor.querySelector("div.div-de-prueba");

    producto.style.transform = "scale(1)";
    producto.style.transition = ".5s";
    contenedor.style.visibility = "visible";
}
function desapareceProducto(element){
    let escondeCajaN1 = element.parentElement.parentElement;
    let caja = escondeCajaN1.querySelector(".div-de-prueba");

    caja.style.transform = "scale(0)";
    escondeCajaN1.style.visibility = "hidden";
};

//---------------- BUSCADOR POR CATEGORIAS PAGINA-1 -------------------//

document.querySelector("#buscador").addEventListener("change", e => {
  const valorSeleccionado = e.target.value.toLowerCase();
  const imagenProducto = document.querySelectorAll('.div-img');

  document.querySelectorAll(".categoria").forEach((producto, index) => {
    if (producto.textContent.toLowerCase().includes(valorSeleccionado)) {
      producto.classList.remove("filtro"); 
      imagenProducto[index].classList.remove("filtro"); 
    } else {
      producto.classList.add("filtro");
      imagenProducto[index].classList.add("filtro");
    }
  });
});

//-------- SACAR PRODUCTOS DEL LOCALSTORAGE PARA MOSTRARLOS EN LA PAGINA DE INCIO --------A--//

window.addEventListener('load', function revisarAlmacenamiento() {
  productosGuardados = JSON.parse(localStorage.getItem("datosProducto"));

  if (productosGuardados) {
    productoCreado = productosGuardados;

    for (i = 0; i < productoCreado.length; i++) {

      const seccion2 = document.getElementById("seccion-2");

      const productCard = document.createElement('div');
      productCard.className = 'div-img';
      productCard.innerHTML = `<img src="${productoCreado[i].img}" id="img-producto" alt="Product Image" onclick="escalaProducto(this)">`;
      seccion2.appendChild(productCard);

      const cajaGrande = document.createElement('div');
      cajaGrande.className = 'info-producto';
      seccion2.appendChild(cajaGrande);
      
      const cajaPequeña = document.createElement('div');
      cajaPequeña.className = 'div-de-prueba';
      cajaGrande.appendChild(cajaPequeña);
   
      cajaPequeña.innerHTML += `
        <i class='bx bx-x' onclick="desapareceProducto(this)"></i>        
        <h1>${productoCreado[i].titulo}</h1>
        <p><strong>Información del Producto</strong></p> 
        <p>${productoCreado[i].descripcion}</p> 
        <strong>Precio:</strong><p><span>${productoCreado[i].price}</span>$</p>
        <strong>Categoría:</strong><p class="categoria"> ${productoCreado[i].category}</p>
        <button onclick="llenarCarrito(this)">Agregar al Carrito</button>
      `;
    }
  }
});

//-------------------------- GUARDAR PRODUCTO EN EL CARRITO ---------------------------//

let carrito = [];
function llenarCarrito(button){  
    function CrearObjeto(titulo, descripcion, precio, categoria) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
};

    const cajaGrande = button.parentNode;
    const titulo = cajaGrande.querySelector('h1');
    const descripcion = cajaGrande.querySelector('p:nth-child(4)');
    const precio = cajaGrande.querySelector('span');
    const categoria = cajaGrande.querySelector('p:nth-child(8)');

    agregarCarrito = new CrearObjeto(titulo.textContent, descripcion.textContent, precio.textContent, categoria.textContent);
    carrito.push(agregarCarrito);

    localStorage.setItem("carritoProductos", JSON.stringify(carrito));
    localStorage.removeItem("llenar");
    location.reload(); 
};

//-------------------------- REVISAR SI HAY PRODUCTOS EN EL CARRITO ---------------------------//

window.addEventListener('load', function revisarCarrito() {
  agregarCarrito = JSON.parse(localStorage.getItem("carritoProductos"));
  if (agregarCarrito) {
    carrito = agregarCarrito;
    const cantidadCarrito = carrito.length;
    const icono = `<i class='bx bxs-cart'></i>`;  
    document.getElementById("icon").innerHTML = `${icono} <p>${cantidadCarrito}</p>` ; 
    
  }
});

//---------------------- ALERTA CUANDO HAYA PRODUCTOS EN EL CARRITO --------------------//

function carritoLleno(){
  if(!localStorage.getItem('llenar') === true && localStorage.getItem('carritoProductos') !== null){
    swal("Genial","¡Se agrego al carrito con exito!","success");
    localStorage.setItem('llenar', false);
  }
};
carritoLleno();




