//---------------------- EDITAR LA INFORMACION DEL PRODUCTO --------------------//

function editProduct(button, index) {
    
    const productCard = button.parentNode;
    const imagenVieja = productCard.querySelector('.div-img img');
    const tituloVieja = productCard.querySelector('p:nth-child(2)');
    const descripcionVieja = productCard.querySelector('p:nth-child(3)');
    const precioVieja = productCard.querySelector('p:nth-child(4)');
    const categoriaVieja = productCard.querySelector('p:nth-child(5)');

    //---------------------- FORMULARIO PARA EDITAR EL PRODUCTO --------------------//

    const cajaGrande = document.createElement('div');
    cajaGrande.className = 'caja-1';
    cajaGrande.id = "caja-2";
    cajaGrande.innerHTML = `
    
    <form class="form-productos" id="form-edicion">
        <i class='bx bx-x' onclick="desapareceFormularioEdicion()"></i>
        <h2>Edita tu Producto</h2>
        <div class="preview-img" id="ver-img"  class="styleImage">
            <img src="img/fondo del div para previsualizar imagenes.png" id="imagen" alt="iamgen">
        </div>
        <input class="form-control form-control-sm" id="imagi" type="file"><br>
        <input type="text" id="title" placeholder="Titulo de tu Producto"  required><br>
        <textarea type="text" id="descripcion" placeholder="Descripción Max 2000 Caracteres" cols="30" rows="5" maxlength="2000" required></textarea><br>
        <input type="number" id="price" placeholder="Precio" required><br>
        <select id="category">
            <option value="">Elige una Categoria</option>
            <option value="celular">celular</option>
            <option value="Computadora">computadora</option>
            <option value="Perifericos">perifericos</option>
            <option value="Audifonos">audifonos</option>
        </select><br>
        <button type="button" id="botonEditar">Editar Producto</button>
    </form>
    
    `;
    
    productList.appendChild(cajaGrande);
    if(productList){
        escalaFormularioEdicion();
        previsualizarImagen();
    };
    
    const editar = document.getElementById("botonEditar");
    
    editar.addEventListener("click", () =>{

        event.preventDefault();
        
        let warnings = "";
        let entrar = false;

        const formEdicion = document.getElementById("form-edicion")
        const fileInput = document.getElementById('imagi');
        const newImagen = fileInput.files.length > 0 ? URL.createObjectURL(fileInput.files[0]) : undefined;
        const newTitulo = document.getElementById('title').value;
        const newDescription = document.getElementById('descripcion').value;
        const newPrecio = document.getElementById('price').value; 
        const newCategoria = document.getElementById('category').value.toLowerCase();
        
        if(newImagen === undefined) {
            warnings += "Selecione una Imagen.\n";
            entrar = true;
        }
        if(newTitulo.length < 5) {
            warnings += "El Título debe tener min 5 Caracteres.\n";
            entrar = true;
        }
        if(newDescription.length < 30) {
            warnings += "La Descripción debe tener min 50 Caracteres.\n";
            entrar = true;
        }
        if(newPrecio <= 0 || newPrecio === undefined) {
            warnings += "El Precio min a Registrar debe ser de un 1$.\n";
            entrar = true;
        }
        if(!categorias.includes(newCategoria)) {
            warnings += "Selecione una Categoria.\n";
            entrar = true;
        }
        if(entrar) {
            swal("Ups",warnings,"warning");
        }
        else {

            const reader = new FileReader();reader.onload = function (event) {
                const image = event.target.result;
                imagenVieja.src = image;
                
                tituloVieja.innerHTML = `<p><strong>Titulo:</strong> ${newTitulo}</p>`;
                descripcionVieja.innerHTML = `<p><strong>Descripción:</strong> ${newDescription}</p> `;
                precioVieja.innerHTML = `<p><strong>Precio:</strong> ${newPrecio}$</p>`;
                categoriaVieja.innerHTML = `<p><strong>Categoría:</strong> ${newCategoria}</p>`;

                //---------------------- ACTUALIZAR LOCALSTORAGE --------------------//
                
                const storaSesion = JSON.parse(localStorage.getItem("datosProducto"));
                
                storaSesion[index].img = image;
                storaSesion[index].titulo = newTitulo;
                storaSesion[index].descripcion = newDescription;  
                storaSesion[index].price = newPrecio;
                storaSesion[index].category = newCategoria;
                
                localStorage.setItem("datosProducto", JSON.stringify(storaSesion));

                //---------------------- REFRESCAR PAGINA ACTUAL --------------------//
    
                localStorage.setItem('editar', true);
                localStorage.removeItem("edicion");
                location.reload();   

            };

            const imagenNueva = document.getElementById('imagi').files[0];
            reader.readAsDataURL(imagenNueva);
            formEdicion.reset();
        }
    });
};

//---------------------- ALERTA PARA EDICION EXITOSA --------------------//

function edicioExistosa(){
    if(!localStorage.getItem('edicion') === true && !localStorage.getItem('editar') === false){
        swal("Genail","¡Tu Producto ha sido Editado Exitosamente!","success");
        localStorage.setItem('edicion', false);
    };
};
edicioExistosa();

//---------------------- PREVISUALIZAR IMAGEN DEL FORMULARIO EDICION --------------------//

function previsualizarImagen(){
    const defaultFile = 'img/fondo del div para previsualizar imagenes.png';
    const imgInput = document.getElementById('imagi');
    const previewImg = document.getElementById('imagen');
    
    imgInput.addEventListener('change', e => {
        
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImg.src = e.target.result;
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            previewImg.src = defaultFile;
        }
    }); 

};

    







      















