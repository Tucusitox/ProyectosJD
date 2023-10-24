//---------------------- MOSTRAR Y OCULTAR CONTRASEÑA DEL FORMULARIO INICIO-REGISTRO ------------//

function ocultarContraseña(inputId, iconId){
    let claveEntrada = document.getElementById(inputId);
    let ocultarClave = document.getElementById(iconId);
    if (claveEntrada.type == "password"){
        claveEntrada.type = "text";
        ocultarClave.className = 'bx bx-show';
    }else{
        claveEntrada.type = "password";
        ocultarClave.className = 'bx bx-low-vision';
    }
};
