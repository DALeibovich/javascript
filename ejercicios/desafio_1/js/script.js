
const RESPUESTACORRECTA = "¿Quieres que te cuente el cuento de la buena pipa?";
function cuentoBuenaPipa(){
    //definimos las variable locales
    let respuesta = '';
    let respuesta_error = '';
    let resultado;
    let vencido = false;
    do{
        respuesta = prompt(`${respuesta_error} ${RESPUESTACORRECTA}`);  
        resultado = analizaFrase(respuesta,RESPUESTACORRECTA);
        
        if(resultado == false){
            respuesta_error = `No dije "${respuesta}", dije:
            `;      
        }
        //se podria detectar el evento escape y/o si apreto cancelar para poder salir
        if(respuesta.toLowerCase() == 'esc' ){ //utiliza "esc" para salir de la iteracion
           
            vencido = true;
        }

    }while(resultado == false && vencido == false); //itera hasta que se ingrese la RESPUESTACORRECTA
 
    mostrarRespuesta(vencido);
    
}

function mostrarRespuesta(vencido){ //muestra la respuesta y pregunta si queire intentar de nuevo
    if(vencido == false){  
        alert("SI POR FAVOR!!!! CONTAMELO QUE YO NO LO SE! :-P");
        }else{
           if(confirm(`TE DISTE POR VENCIDO! :-( ... SI ME DECIAS:
                ${RESPUESTACORRECTA}
                    ¡¡¡QUIZAS TE LO CONTABA!!!

                    ¿deseas intentar de nuevo?
                    ` )){
                        cuentoBuenaPipa();
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
