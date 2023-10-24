//------- EVITAR QUE EL USUARIO ENTRE A LA PAGINA SIN INICIAR SESION PREVIAMENTE -----//

const user = JSON.parse(localStorage.getItem("inicioSesion")) || false;
if(!user){
  window.location.href = "Logins-Inicio-Registro.html"
};

//---------------- BIENVENIDA ------------------//

function bienvenido(){
  if (!localStorage.getItem('bienvenida') === true){
    swal("Bienvenido", "Inicio de Sesión Exitoso", "success");
    localStorage.setItem('bienvenida', false);
  }
}
bienvenido();

//------------------------ VALIDAR FORMULARIO DE PRODUCTOS -----------------------------//

let categorias = ["celular", "computadora", "perifericos", "audifonos"];

function validarProducto(){
  event.preventDefault();

  let warnings = "";
  let entrar = false;

  const fileInput = document.getElementById('formFileSm');
  const image = fileInput.files.length > 0 ? URL.createObjectURL(fileInput.files[0]) : undefined;
  const titulo = document.getElementById('titulo').value;
  const description = document.getElementById('description').value;
  const precio = document.getElementById('precio').value; 
  const categoria = document.getElementById('categorias').value.toLowerCase();

  if(image === undefined){
      warnings += "Recuerda Subir la Imagen del Producto a Registra.\n";
      entrar = true;
  }
  if(titulo.length < 5){
    warnings += "El Título debe tener min 5 Caracteres.\n";
    entrar = true;
  }
  if(description.length < 30){
    warnings += "La Descripción debe tener min 50 Caracteres.\n";
    entrar = true;
  }
  if(precio <= 0 || precio === undefined){
    warnings += "El Precio min a Registrar debe ser de un 1$.\n";
    entrar = true;
  }
  if(!categorias.includes(categoria)){
    warnings += "Selecione una Categoria.\n";
    entrar = true;
  }
  if(entrar){
      swal("Ups",warnings,"warning");
  }else{
    registrarProductos();
    
  }
};
//------------------------------------------------- REGISTRAR PRODUCTO ---------------------------------------------//

let productoCreado = [];
let productForm = document.getElementById('form-productos');
let productList = document.getElementById('seccion-1');

function registrarProductos() {
  event.preventDefault();
  
  function CrearObjeto1(img, titulo, descripcion, price, category) {
    this.img = img;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.price = price;
    this.category = category;
  }
  
  const imageFile = document.getElementById('formFileSm').files[0];
  const titulo = document.getElementById('titulo').value;
  const description = document.getElementById('description').value;
  const precio = document.getElementById('precio').value;
  const categoria = document.getElementById('categorias').value;
  
  const reader = new FileReader();
  reader.onload = function (event) {
    
    const image = event.target.result;

    nuevoProducto = new CrearObjeto1(image, titulo, description, precio, categoria);
    productoCreado.push(nuevoProducto);

    //------------------------ PARA MOSTRAR PRODUCTOS EN LA PAGINA -----------------------------//

    const cajaGrande = document.createElement('div');
    cajaGrande.id = 'contenedorProduct';
    cajaGrande.className = 'div-de-prueba';
    productList.appendChild(cajaGrande);

    const productCard = document.createElement('div');
    productCard.className = 'div-img';

    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.alt = 'Product Image';
    imgElement.id = 'img-producto';
    productCard.appendChild(imgElement);
    cajaGrande.appendChild(productCard);


    cajaGrande.innerHTML += `
    
    <p><strong>Titulo:</strong> ${titulo}</p>
    <p><strong>Descripción:</strong> ${description}</p> 
    <p><strong>Precio:</strong> ${precio}$</p>
    <p class="category"><strong>Categoría:</strong> ${categoria}</p>
    <button onclick="editProduct(this, i)" id="botonEdicion">Editar</button>
    <button onclick="deleteProduct(this, i)">Eliminar</button>
    
    `;

    productForm.reset();

    swal('Genial', '¡Tu Producto ha sido Registrado con Éxito!', 'success');

    if (productoCreado !== null) {
      guardarArreglo();
    }
  };

  img.src = defaultFile;
  reader.readAsDataURL(imageFile);
}

//---------------------- PREVISUALIZAR IMAGEN DEL FORMULARIO --------------------//


const defaultFile = 'img/fondo del div para previsualizar imagenes.png';
const file = document.getElementById( 'formFileSm');
const img = document.getElementById( 'img' );

file.addEventListener( 'change', e => {
  if( e.target.files[0] ){
    const reader = new FileReader( );
    reader.onload = function( e ){
      img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
  }else{
    img.src = defaultFile;
  }
} );


//------------------------ GUARDAR EL PRODUCTO EN EL LOCALSTORAGE -----------------------------//

function guardarArreglo() {
  localStorage.setItem("datosProducto", JSON.stringify(productoCreado));
};

//--- VERIFICAR SI HAY UN INFORMACION GUARDADA EN EL LocalStorage ----//

window.addEventListener('load', function revisarAlmacenamiento() {
  productosGuardados = JSON.parse(localStorage.getItem("datosProducto"));

  if (productosGuardados) {
    productoCreado = productosGuardados;

    for (i = 0; i < productoCreado.length; i++) {
      const cajaGrande = document.createElement('div');
      cajaGrande.id = 'contenedorProduct';
      cajaGrande.className = 'div-de-prueba';
      productList.appendChild(cajaGrande);

      const productCard = document.createElement('div');
      productCard.className = 'div-img';
      productCard.innerHTML = `<img src="${productoCreado[i].img}" id="img-producto" alt="Product Image">`;
      cajaGrande.appendChild(productCard);

      cajaGrande.innerHTML += `
        <p><strong>Titulo:</strong> ${productoCreado[i].titulo}</p>
        <p><strong>Descripción:</strong> ${productoCreado[i].descripcion}</p> 
        <p><strong>Precio:</strong> ${productoCreado[i].price}$</p>
        <p class="category"><strong>Categoría:</strong> ${productoCreado[i].category}</p>
        <button onclick="editProduct(this, ${i})" id="botonEdicion">Editar</button>
        <button onclick="deleteProduct(this, ${i})">Eliminar</button>
      `;
    }
  }
});

//------------------------ BORAR PRODUCTO DEL LOCALSTORAGE ---------------------//

function deleteProduct(button, index) {

  const productCard = button.parentNode;

  swal({
    title: "¿Seguro?",
    text: "Estas Seguro que quieres Eliminar este Producto",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      
      productosGuardados.splice(index, 1);
      productCard.remove();
      localStorage.setItem("datosProducto", JSON.stringify(productosGuardados));
      
      swal("Genial","¡Producto Eliminado Exitosamente!","success")
    } 
  });
};

//---- PARA CERRAR LA SESION -----//

function devolver() {
  swal({
    title: "¿Seguro?",
    text: "Estas Seguro que quieres Cerrar la Sesión",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

      localStorage.removeItem("inicioSesion"); 
      localStorage.removeItem("bienvenida");
      localStorage.removeItem("cerrado"); 
      location.href = "Logins-Inicio-Registro.html"
    } 
  });
};




