import { notificaciones } from '../funciones.js';
class Envio {

    constructor(id, cp, localidad, costoenvio) {
        this.id = id;
        this.cp = cp;
        this.localidad = localidad;
        this.costoenvio = costoenvio;

    }



}

export const calculaCostoEnvio = (importe, codpostal) => {
    //se pide codpostal e importe porque puede suceder que el importe de ENVIOGRATIS sea variable segun la provincia
    let costoenvio;

    for (let i = 0; i < DB_CP.length; i++) {
        if (DB_CP[i].cp === codpostal) {
            cpEnvioSeleccionado = DB_CP[i];
            costoenvio = DB_CP[i].costoenvio;
            localStorage.setItem("envio", JSON.stringify(cpEnvioSeleccionado));
            if (verificaEnvioGratis(importe) === true) {
                costoenvio = 0;
            }

        }

    };


    if (costoenvio === undefined) {
        notificaciones("No hacemos envios al codigo postal ingresado", 'red');
    } else {
        if (costoenvio === 0) {
            notificaciones(`Envio gratis a ${cpEnvioSeleccionado.localidad}`);
        } else {
            notificaciones(`El costo de envio a ${cpEnvioSeleccionado.localidad} es de $${cpEnvioSeleccionado.costoenvio}.`, 'orange');
        }

    }

    //retorna el costo del envio, 0 si es gratis y undefined si no encuentra la localidad
    return costoenvio;

}

const verificaEnvioGratis = (importe) => {
    let enviogratis = false;
    if (parseFloat(importe) >= ENVIOGRATIS) {
        enviogratis = true;
    }
    return enviogratis;
}

export const quitarEnvio = () => {

    localStorage.removeItem('envio');
    cpEnvioSeleccionado = [];
    notificaciones('Envio quitado con exito', 'orange');

}


/*const envio1 = new Envio(1, 'x5000', 'Cordoba Capital', 1200);
const envio2 = new Envio(2, 'y6000', 'Santa Fe', 1100);
const envio3 = new Envio(2, 'z7000', 'San Luis', 1000);
export const DB_CP = [envio1, envio2, envio3];*/

export let DB_CP = [new Envio()];
export const ENVIOGRATIS = 16000; //importe minimo del envio gratis


const cargarCPStorage = () => {
    return JSON.parse(localStorage.getItem('envio')) ?? [new Envio()];
    
    //
}

const cargaCP = async () => {
    let cpLocal = [];
    let controller = new AbortController();
    const response = await fetch('json/envios.json', { signal: controller.signal });
    if (response.ok === true) {
        const cp = await (response.json());
        cp.forEach(e => {
            cpLocal.push(new Envio(e.id, e.cp, e.localidad, e.costoenvio))
        })
        DB_CP = [...cpLocal];
        cpEnvioSeleccionado = cargarCPStorage()
    } else {
        controller.abort();
        console.log('error de conexion');
    }

    
    return response.ok;
}



export let cpEnvioSeleccionado = cargaCP(); // JSON.parse(localStorage.getItem('envio')) ?? [new Envio()];
