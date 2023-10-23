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

//---------------- BUSCADOR POR CATEGORIAS -------------------//

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
        <p><strong>Descripción:</strong> ${productoCreado[i].descripcion}</p> 
        <p><strong>Precio:</strong> ${productoCreado[i].price}$</p>
        <p class="categoria"><strong>Categoría:</strong> ${productoCreado[i].category}</p>
      `;
    }
  }
});






