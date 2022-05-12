
const RESPUESTACORRECTA = "¿Quieres que te cuente el cuento de la buena pipa?";
function cuentoBuenaPipa(){
    //definimos las variable locales
    let respuesta = '';
    let respuesta_error = '';
    let resultado;
    do{
        respuesta = prompt(`${respuesta_error} ${RESPUESTACORRECTA}`);  
        resultado = analizaFrase(respuesta,RESPUESTACORRECTA);
        
        if(resultado == false){
            respuesta_error = `No dije "${respuesta}", dije:
            `;      
        }

        if(respuesta.toLowerCase() == 'esc'){ //utiliza "esc" para salir de la iteracion
            alert(`TE DISTE POR VENCIDO! :-( ... SI ME DECIAS:
                ${RESPUESTACORRECTA}

                ¡¡¡QUIZAS TE LO CONTABA!!!`);
            exit;
        }

    }while(resultado == false); //itera hasta que se ingrese la RESPUESTACORRECTA
 
       alert("SI POR FAVOR!!!! CONTAMELO QUE YO NO LO SE! :-P");
    
}

function analizaFrase(frase1,frase2) {
    //permite comparar 2 frases cualquiera y retornar si son iguales insesitivamente 
    let ret = false;    
    if( frase1.toLowerCase() == frase2.toLowerCase()){
        ret = true;
    }
    return ret;
}
