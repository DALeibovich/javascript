const ENVIOGRATIS = 6000; //importe limite del envio gratis
const MINIMODECOMPRACUPON = 1000; //importe limite de compra para aplicar los cupones
const DB_CP = [ //simula una DB de Codigos Postales
	{postal: 5000, provincia: 'Cordoba', costo: 1200},
	{postal: 6000, provincia: 'Santa Fe', costo: 1100},
	{postal: 7000, provincia: 'Buenos Aires', costo: 900},
];
Object.freeze(DB_CP);

const DB_CUPONES = [ //simula una DB de cupones de descuentos
	{codigo: 'HOUSE10', beneficio: 0.10}, // descuenta porcentaje
	{codigo: 'HOUSE15', beneficio: 0.15}, //descuenta porcentaje
	{codigo: 'HOUSE500', beneficio: 500}, //descuenta pesos
];
Object.freeze(DB_CUPONES);



const obtieneCuponDescuento = (cupon) => {
	let beneficio = 0;
	for(let i=0; i<DB_CUPONES.length;i++){
			if(DB_CUPONES[i].codigo.toLowerCase() === cupon.toLowerCase()){
				beneficio = DB_CUPONES[i].beneficio;
				break;
			}

		};
		return beneficio;

}

const calculaDescuentoCupon = (importe, cupon) =>{

	let beneficio = obtieneCuponDescuento(cupon);
	let descuento = 0;
	if(beneficio > 0 && beneficio <= 1){ //verifica si descuento es por %
		descuento = (importe * beneficio); 
	}else{
		descuento = beneficio;
	}
	return parseFloat(descuento);
}

//console.log(calculaDescuentoCupon(1500,'HOUSE10'));


const calculaCostoEnvio = (importe, codpostal) =>{
	//se pide codpostal e importe porque puede suceder que el importe de ENVIOGRATIS sea variable segun la provincia
	let costoenvio;
	
	for(let i=0; i<DB_CP.length;i++){
		if(DB_CP[i].postal === codpostal){
			costoenvio = DB_CP[i].costo;
			if( verificaEnvioGratis(importe) === true){
					costoenvio = 0;
				}
			
		}

	};
	
	//retorna el costo del envio, 0 si es gratis y undefined si no encuentra la localidad
	return costoenvio;

}

const verificaEnvioGratis = (importe) => {
	let enviogratis = false;
	if(parseFloat(importe) >= ENVIOGRATIS){
		enviogratis = true;
	}
	return enviogratis; 
}



function validarPrecioIngresado(valor){
    let ret = false;
    if(isNaN(valor) || parseFloat(valor) < 0){
         ret = true;    
    }
    
    return ret;
}

//simula el ingreso de precios de 2 productos y un cupon de descuento.

const ingresarPrecios  =() => {
    let producto1, producto2 = 0;
    let salir;
    do{
        salir = 1;
        producto1 = parseFloat(prompt("Precio Producto 1"));
        producto2 = parseFloat(prompt("Precio Producto 2"));
       
        if(validarPrecioIngresado(producto1) || validarPrecioIngresado(producto2)) {
            alert("Por favor ingrese precios valido");    
            salir = 0;      
        }
       
             
    }while(salir == 0 );

    return producto1 + producto2; 
}

const  simularDescuento = () => {
    
    let cupon = 0;      
    let total = ingresarPrecios();
    cupon = prompt("Ingrese el codigo de cupon de descuento (cupones validos: HOUSE10 (-10%), HOUSE15 (-15%), HOUSE500 (-$500)").toString();
         
    if(parseFloat(total) >= MINIMODECOMPRACUPON){
        let descuento = calculaDescuentoCupon(total,cupon);
        if(descuento === 0) alert("Cupon inexistente"); 
        else alert(`Descuento aplicado de: $${descuento}. Total a pagar $${total-descuento}`);
    
    }else{
        alert(`Cupon no aplicable. Minimo de compra: $${MINIMODECOMPRACUPON}`);
    }

}


const  simularEnvio = () => {
    let codigoPostal = 0;      
    let total = ingresarPrecios();
    codigoPostal = parseInt(prompt("Ingrese el codigo postal de su localidad (Validos: 5000, 6000, 7000)"));
   
 
        let costoenvio = calculaCostoEnvio(total,codigoPostal);
		//alert(costoenvio);
        if(costoenvio === undefined){
             alert("No hacemos envios al codigo postal ingresado"); 
        }else{
            if(costoenvio === 0) {
                alert(`Envio gratis a su localidad de CP:${codigoPostal}`);               
            }else{
                alert(`el costo de envio es: $${costoenvio}. Total a pagar $${total+costoenvio}`);
            }
      
        }
   

}