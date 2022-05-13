
const RESPUESTACORRECTA = "¿Quieres que te cuente el cuento de la buena pipa?";
function cuentoBuenaPipa(){
    //definimos las variable locales
    let respuesta = '';
    let respuesta_error = '';
    let resultado;
    let porvencido = false;
    do{
        respuesta = prompt(`${respuesta_error} ${RESPUESTACORRECTA}`).toString();  
        resultado = analizaFrase(respuesta,RESPUESTACORRECTA);
        
        if(resultado == false){
            respuesta_error = `No dije "${respuesta}", dije:
            `;      
        }
        /*se podria detectar el evento escape y/o si apreto cancelar para poder salir*/
        if(respuesta.toLowerCase() == 'esc' ){ //utiliza la palabra "esc" para salir de la iteracion           
            porvencido = true;
        }

    }while(resultado == false && porvencido == false); //itera hasta que se ingrese la RESPUESTACORRECTA
 
    mostrarRespuesta(porvencido);
    
}

function mostrarRespuesta(porvencido){ //muestra la respuesta y pregunta si queire intentar de nuevo
    if(porvencido == false){  
        alert("SI POR FAVOR!!!! CONTAMELO QUE YO NO LO SE! :-P");
        }else{
           if(confirm(`TE DISTE POR VENCIDO! :-( ... SI ME DECIAS:
                "${RESPUESTACORRECTA}"
                    ¡¡¡QUIZAS TE LO CONTABA!!!

                    ¿Deseas intentar de nuevo?
                    ` )){
                        
                        cuentoBuenaPipa(); //vuelve a comenzar el juego
                }
        }

}
function analizaFrase(frase1,frase2) {
    //permite comparar 2 frases cualquiera y retornar si son iguales insesitivamente 
    let ret = false;    
    if( frase1.toLowerCase() == frase2.toLowerCase()){
        ret = true;
    }
    return ret;
}
