const actualizaDomChat = (idSelector, mensaje) =>{
    let escribio ="";
    let chat = document.getElementById(idSelector);
    let nombre = document.getElementById('nombre');
    console.log(nombre);
    if(nombre != null) escribio = `<em><font class="nombre">${nombre.innerHTML}</font> escribio: </em>`;
    chat.innerHTML += `<div class="mensaje">${escribio} ${mensaje}</div>`;

}

const ingresarMensaje  = (idSelector='cuerpoChat') => {    
        mensaje = document.getElementById('mensaje');          
        actualizaDomChat(idSelector,mensaje.value); 
        mensaje.value = "";              

   
}

const bienvenido = (idSelector='cuerpoChat') => { 
    let mensaje = "";
    mensaje = prompt("Su nombre: ").toString().toUpperCase();
    actualizaDomChat(idSelector,`Bienvenido <b><font id="nombre" class="nombre">${mensaje}</font></b> a nuestro chat virtual, ¿en que puedo ayudarte?`);   

}

const imprimirChat = (idSelector) => { 
    let chat = document.getElementById(idSelector);
    alert(chat.innerHTML);
}

const colorearNombre = (idSelector) => {
    
    let elemento = document.getElementsByClassName(idSelector);
    for(elem of elemento) {
        console.log(elem.className);
        elem.className = "nombre rojo";
    };         
     
    
};

const borrarNombre = (idSelector) => {
    
    let elemento = document.getElementsByClassName(idSelector);
    console.log(elemento);
        for(elem of elemento) {
            elem.innerHTML = "";
        };         
    
};

bienvenido();
