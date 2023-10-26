//------------------ VALIDANDO FORMULARIO DE REGISTRO ----------//

function validarRegistro(){
    event.preventDefault();
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/

    const nombre = document.getElementById("usuario-registro");
    const email = document.getElementById("email-registro");
    const pass = document.getElementById("clave-registro");

    if(nombre.value.length < 6){
        warnings += "El usuario debe tener min 6 caracteres\n";
        entrar = true;
    }
    if(!regexEmail.test(email.value)){
        warnings += "El email Ingresado no es valido\n";
        entrar = true;
    }
    if(pass.value.length < 8){
        warnings += "La contraseña debe tener min 8 caracteres\n";
        entrar = true;
    }
    if(entrar){
        swal("Ups",warnings,"warning"); 
    }else{
        capturaRegistro();
    }
};

//------------------ GUARDANDO DATOS DE REGISTRO EN ARREGLO-OBEJETO ----------//

let usuarioCreado = [];
function capturaRegistro(){
    function CrearObjeto1(name, email, password){
        this.name=name;
        this.email=email;
        this.password=password;
    }
    
    const nombreCaptura = document.getElementById("usuario-registro").value;
    const correoCaptura = document.getElementById("email-registro").value;
    const claveCaptura = document.getElementById("clave-registro").value;
    nuevoUsuario = new CrearObjeto1(nombreCaptura, correoCaptura, claveCaptura);

    //----- CONSULTAR QUE SI EXITEN DATOS IGUALES REGISTRADOS ANTERIORMENTE --------//

    const consulta = usuarioCreado.some(user => user.name == nombreCaptura || user.email == correoCaptura);
    if(consulta){
        parrafo = "Este Usuario o Correo ya están Registrados";
        swal("Ups",parrafo,"error");
    }
    else{
        usuarioCreado.push(nuevoUsuario);
        guardarArreglo(); 

        localStorage.removeItem("sesion");
        location.reload();

        //--------  RESETEAR FORMULARIO -------//
        const resetRegistro = document.getElementById("registro");
        resetRegistro.reset();
    }   
};

//---------------------- ALERTA CUANDO SE REGISTRE UN NUEVO USUARIO --------------------//

function sesionExistosa(){
    if(!localStorage.getItem('sesion') === true && localStorage.getItem('datosUsuarios') !== null){
        swal("Genial","¡Registro Exitoso!","success");
        localStorage.setItem('sesion', false);
    }
};
sesionExistosa();

//--------------- GUARDAR ARREGLO EN LocalStorage ----------//

function guardarArreglo(){
    localStorage.setItem("datosUsuarios", JSON.stringify(usuarioCreado));
};

//--- VERIFICAR SI HAY UN INFORMACION GUARDADA EN EL LocalStorage ----//

window.addEventListener('load', function revisarAlmacenamiento(){
    datosGuardados = JSON.parse(localStorage.getItem("datosUsuarios"));
    if (datosGuardados){
        usuarioCreado = datosGuardados;
    }
});

//------------------ VALIDANDO FORMULARIO DE INICIO DE SESION ----------//

function validarInicio(){
    event.preventDefault();
    let inicio = "";
    let validar = false;

    const usuario = document.getElementById("usuario-login");
    const clave = document.getElementById("clave-login");

    if(usuario.value.length < 6){
        inicio += "El usuario debe tener un min 6 caracteres\n";
        validar = true;
    }
    if(clave.value.length < 8){
        inicio += "La contraseña debe tener un min 8 Caracteres\n";
        validar = true;
    }
    if(validar){
        swal("Ups",inicio,"warning");
    }else{
        coincidirDatos();  
    }
};

//-------- COMPROBAR SI LOS DATOS COINCIDEN PARA INCIAR SESION -----------//

let datosIniSesion = [];
function coincidirDatos(){
    function CrearObjeto2(usuario, clave,){
        this.usuario=usuario;
        this.clave=clave;
    }
    const coinciUsuar = document.getElementById("usuario-login").value;
    const coinciClave = document.getElementById("clave-login").value;
    sesionIniciada = new CrearObjeto2(coinciUsuar,coinciClave)

    const datos = datosGuardados.some(item => item.name == coinciUsuar || item.email == coinciUsuar && item.password == coinciClave);
    if(datos){
        datosIniSesion.push(sesionIniciada);
        localStorage.setItem("inicioSesion", JSON.stringify(datosIniSesion));
        location.href = "Pagina-CargarProductos.html"
        
        //--------  RESETEAR FORMULARIO -------//
        const resetInicio = document.getElementById("inicio");
        resetInicio.reset();
    }
    else{
        swal("Ups","Usuario o Contraseña Incorrectos","error")
    }
};

//--------- CERRAR SESION DE FORMA EXITOSA  ------//

function sesionCerrada(){

    let visita1 = !localStorage.getItem("visita") === true;
    let visita2 = !localStorage.getItem("cerrado") === true;

    if(!visita1 && visita2){
        swal("Genial","Sesión Cerrada Exitosamente","success");
        localStorage.setItem('cerrado', false);
    }
    if(visita1){
        localStorage.setItem("visita", false);
    }
};
sesionCerrada();



  







