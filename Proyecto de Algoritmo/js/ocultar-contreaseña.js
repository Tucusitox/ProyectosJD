function ocultarContraseña(inputId, iconId){
    let claveEntrada = document.getElementById(inputId);
    let ocultarClave = document.getElementById(iconId);
    if (claveEntrada.type == "password"){
        claveEntrada.type = "text";
        ocultarClave.classList.remove("bxs-lock-alt");
        ocultarClave.classList.add("bxs-lock-open-alt");
    }else{
        claveEntrada.type = "password";
        ocultarClave.classList.remove("bxs-lock-open-alt");
        ocultarClave.classList.add("bxs-lock-alt");
    }
};
