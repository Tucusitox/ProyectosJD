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
        warnings += "El Usuario debe tener min 6 Caracteres\n";
        entrar = true;
    }
    if(!regexEmail.test(email.value)){
        warnings += "El Email Ingresado no es valido\n";
        entrar = true;
    }
    if(pass.value.length < 8){
        warnings += "La Contraseña debe tener min 8 Caracteres\n";
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
        swal("Genial","Registro Exitoso","success");

        //--------  LIMPIAR CACILLAS DEL FORMULARIO -------//
        document.getElementById("usuario-registro").value = "";
        document.getElementById("email-registro").value = "";
        document.getElementById("clave-registro").value = "";
    }   
};

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
        inicio += "El Usuario debe tener un min 6 Caracteres\n";
        validar = true;
    }
    if(clave.value.length < 8){
        inicio += "La Contraseña debe tener un min 8 Caracteres\n";
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

    const datos = datosGuardados.some(item => item.name == coinciUsuar && item.password == coinciClave);
    if(datos){
        datosIniSesion.push(sesionIniciada);
        localStorage.setItem("inicioSesion", JSON.stringify(datosIniSesion));
        location.href = "Pagina-CargarProductos.html"
        
        
        //--------  LIMPIAR CACILLAS DEL FORMULARIO -------//
        document.getElementById("usuario-login").value = "";
        document.getElementById("clave-login").value = "";
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




  







