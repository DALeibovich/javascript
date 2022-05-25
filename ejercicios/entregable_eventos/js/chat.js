const actualizaDomChat = (idSelector, mensaje) =>{
    let escribio ="";
    let texto ="";
    let chat = document.getElementById(idSelector);
    texto = chat.innerHTML;
    let nombre = document.getElementById('nombre');
    console.log(nombre);
    if(nombre != null && mensaje != "") escribio = `<em><font class="nombre">${nombre.innerHTML} dice:</font> </em>`;
    texto += `
    <div class="mensaje">${escribio} ${mensaje}</div><hr>    
    `;
    if(cont > 0 && cont < arrRespuestas.length) texto +=  `<div class="respuesta">ADIVINATOR dice: ${arrRespuestas[cont]}</div> `;
    if(cont >= 1) tocame.style.display = 'block';
    chat.innerHTML = texto;
    cont++;

}

const ingresarMensaje  = (idSelector='cuerpoChat') => {    
        mensaje = document.getElementById('mensaje');          
        actualizaDomChat(idSelector,mensaje.value); 
        mensaje.value = "";              

   
}

const bienvenido = (idSelector='cuerpoChat') => { 
    let mensaje = "";
    mensaje = prompt("Su nombre: ").toString().toUpperCase();
    actualizaDomChat(idSelector,`Bienvenido <b><font id="nombre" class="nombre">${mensaje}</font></b>, HAZME UNA PREGUNTA Y TE DIRE EN QUE PIENSAS... `);   

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

const ocultarNombre = (idSelector) => {
    let textoboton ="";
    let elemento = document.getElementsByClassName(idSelector);
    console.log(elemento);
   
        for(elem of elemento) {
            //elem.innerHTML = "";
            if(elem.style.display == "none"){
                elem.style.display = "block"; 
                textoboton = "Ocultar nombre";
            }else{ 
                elem.style.display = "none";
                textoboton = "Mostrar nombre";
            }
        };         
        return textoboton;
};


btnEnviarMensaje.addEventListener("click",() =>{
    ingresarMensaje();
})

btnColorearNombre.addEventListener("click",() => colorearNombre('nombre'));

let botonOcultar = document.getElementById('btnOcultarNombre');
botonOcultar.onclick = () => {
    botonOcultar.innerText = ocultarNombre('nombre');
}

mensaje.addEventListener("keyup",() =>{
    mensaje.value = mensaje.
    value.toUpperCase();
})

mensaje.addEventListener("keypress",(event) =>{
    if(event.key === "Enter" ){
        ingresarMensaje(); 
    }
})


    let tocame = document.getElementById('btnTocame');
   // tocame.style.display = 'none';
    tocame.onmouseover = () => {
        tocame.style.display = "table";
        if(tocame.style.marginLeft.toString() === "25%") 
            tocame.style.marginLeft = '0%'
        else
        tocame.style.marginLeft = '25%'
       
        if(cont < arrRespuestas.length-1) actualizaDomChat('cuerpoChat',""); 
    console.log(tocame.style.display );
    
   
}
const arrRespuestas = ["",'Haz click en el boton "TOCAME" y encontraras la respuesta!!','Ossssoooooo!','Ooooleee toro!',"Ponee plaayyyyy!","TU ESTAS PENSANDO EN COMO DIABLOS APRETO EL BOTON TOCAME!!... <font color=blue><b>¿ADIVINE VERDAD?</b></font> ",";-P"]
let cont = 0;

bienvenido();
