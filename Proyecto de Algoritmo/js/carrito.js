//-------------------------- REVISAR SI HAY PRODUCTOS EN EL CARRITO ---------------------------//
let total = 0;

window.addEventListener('load', function revisarCarrito() {
    agregarCarrito = JSON.parse(localStorage.getItem("carritoProductos"));
    if (agregarCarrito) {
        carrito = agregarCarrito;

        for (i = 1; i <= carrito.length; i++) {
            
            const tabla = document.getElementById("tabla");
            tabla.innerHTML += `
            <tbody id="filas">
                <tr>
                    <th scope="row">${i}</th>  
                    <td>${carrito[i-1].titulo}</td>
                    <td>${carrito[i-1].precio}$</td>
                    <td>${carrito[i-1].categoria}</td>
                    <td><i class='bx bx-x'  onclick="eliminarFila(event, ${i-1})"></i></td> 
                </tr>
            </tbody> 
            `;
            total += parseFloat(carrito[i-1].precio);
        }
        const totalPago = document.querySelector(".totalPago");
        totalPago.innerHTML = `<h1>Total a Pagar:</h1><br>
                                <p>${total}$</p> `; 
    }
});

//-------------------------- ELIMINAR PRODUCTO DEL CARRITO ---------------------------//

function eliminarFila(event, index) {

    const fila = event.target.parentNode.parentNode;

    swal({
        title: "¿Seguro?",
        text: "Estas Seguro que quieres Eliminar este Producto del Carrito",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
            fila.remove();
            carrito.splice(index, 1);
            localStorage.setItem("carritoProductos", JSON.stringify(carrito));
            
            swal("Genial","¡Producto Eliminado del Carrito Exitosamente!","success");

            productoEliminado();
            
        }
    });
};
//---------------------- ARECARGAR APGINA AL BORRAR UN ARTICULO --------------------//

function productoEliminado(){
    setTimeout(function() {
        location.reload();
    }, 1000);
};


//---------------------- ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO --------------------//

function borrarCarrito(){

    const filasTotales = document.querySelectorAll(".filas");

    swal({
        title: "¿Seguro?",
        text: "¿Seguro que quieres Eliminar todos los productos del Carrito?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {

            filasTotales.innerHTML = "";
            localStorage.removeItem("carritoProductos"); 
            localStorage.removeItem("carrito");
            location.reload();
        }
    });
};

//---------------------- ALERTA CUANDO SE ELIMINE TODO EL CARRITO --------------------//

function carritoEliminado(){
    if(!localStorage.getItem('carrito') === true && localStorage.getItem('carritoProductos') == null){
        swal("Genial","¡Productos Eliminados con Exito!","success");
        localStorage.setItem('carrito', false);
    }
};
carritoEliminado();



