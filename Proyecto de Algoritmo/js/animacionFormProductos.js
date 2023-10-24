//-------------------------------- ANIMACION FORMULARIO DE REGISTRO DE PRODUCTOS ---------------//

function escalaFormularioRegistro(){
    let cajaN1 = document.getElementById("caja-1");
    let formulario1 = document.getElementById("form-productos");
    formulario1.style.transform = "scale(1)";
    formulario1.style.opacity = "1";
    formulario1.style.transition = ".5s";
    cajaN1.style.visibility = "visible";
    

    //---- PARA CERRAR EL FORMULARIO DE EDICION SI ESTA ABIERTO ----//

    let cajaN2 = document.getElementById("caja-2");
    let formulario2 = document.getElementById("form-edicion");

    if(cajaN2 && formulario2) {
        let escondeCajaN2 = document.getElementById("caja-2");
        let caja2 = document.getElementById("form-edicion");
        caja2.style.transform = "scale(0)";
        escondeCajaN2.style.visibility = "hidden";
    }
};

function desapareceFormularioRegistro(){
    let escondeCajaN1 = document.getElementById("caja-1");
    let caja1 = document.getElementById("form-productos");
    caja1.style.transform = "scale(0)";
    escondeCajaN1.style.visibility = "hidden";
};

//------------------ ANIMACION FORMULARIO DE REGISTRO DE PRODUCTOS --------------//

function escalaFormularioEdicion(){
    let cajaN2 = document.getElementById("caja-2");
    let formulario2 = document.getElementById("form-edicion");
    formulario2.style.transform = "scale(1)";
    formulario2.style.opacity = "1";
    formulario2.style.transition = ".5s";
    cajaN2.style.visibility = "visible";
    
};

function desapareceFormularioEdicion(){
    let escondeCajaN2 = document.getElementById("caja-2");
    let caja2 = document.getElementById("form-edicion");
    caja2.style.transform = "scale(0)";
    escondeCajaN2.style.visibility = "hidden";
};

//---------------- BUSCA POR CATEGORIAS LOS PRODUCTOS-PAGINA-2 ------------------//


document.querySelector("#buscador").addEventListener("change", e => {
    const valorSeleccionado = e.target.value.toLowerCase();
  
    document.querySelectorAll(".category").forEach(buscar => {
       
        if(buscar.textContent.toLowerCase().includes(valorSeleccionado)){
          buscar.classList.remove("filtro");
          buscar.parentNode.classList.remove("filtro");
        }else{
          buscar.classList.add("filtro");
          buscar.parentNode.classList.add("filtro");
        }
          
            
    });
  }); 

