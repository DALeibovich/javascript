import { notificaciones } from '../funciones.js';
class Cupon {

    constructor(id, codigo, beneficio) {
        this.id = id;
        this.codigo = codigo;
        this.beneficio = beneficio;
        if (this.beneficio <= 1) this.tipo = '%'; else this.tipo = '$';

    }


}
/*
const cupon1 = new Cupon(1, 'HOUSE10', 0.1);
const cupon2 = new Cupon(2, 'HOUSE15', 0.15);
const cupon3 = new Cupon(3, 'HOUSE30', 0.3);
const cupon4 = new Cupon(4, 'HOUSE500', 500);
const cupon5 = new Cupon(5, 'HOUSE800', 800);
export const DB_CUPONES = [cupon1, cupon2, cupon3, cupon4, cupon5];*/
export let DB_CUPONES = [new Cupon()];



export const consultarCuponDisponible = (cupon) => {
    let cupones = [...DB_CUPONES];
    let ret = "";
    let beneficio = undefined;

    for (cupones of DB_CUPONES) {
        if (cupones.codigo.toUpperCase() === cupon.toUpperCase()) {
            cuponSeleccionado = cupones;
            // localStorage.setItem("cupon", JSON.stringify(cupones));
            localStorage.setItem("cupon", cupones.codigo);
            if (parseInt(cupones.beneficio) < 1) {
                ret = `El cupon tiene un descuento de ${parseFloat(cupones.beneficio) * 100}% `;
            } else {
                ret = `El cupon tiene un descuento de $${cupones.beneficio} `
            }
            beneficio = cupones.beneficio;

        }
    };
    (ret !== '') ? notificaciones(ret) : notificaciones('Cupon no valido', 'orange');
    return beneficio;
}


export const verificaExistenciaCupon = (cupon) => {
    let existeCupon = false
    let cupones;
    for (cupones of DB_CUPONES) {
        if (cupones.codigo === cupon) {
            existeCupon = true;
        }
    };
    return existeCupon;
}



const cargarCuponStorage = () => {
    let cupon = localStorage.getItem('cupon') ?? '';

    if (cupon != '') {

        cupon = DB_CUPONES.find(db => db.codigo.toUpperCase() == cupon.toUpperCase());


    } else {
        cupon[new Cupon()];
    }

    return cupon;
    //
}
//export let cuponSeleccionado = JSON.parse(localStorage.getItem('cupon')) ?? [new Cupon()];

const cargaCupones = async () => {
    let cuponLocal = [];
    let controller = new AbortController();
    const response = await fetch('json/cupones.json', { signal: controller.signal });
    if (response.ok === true) {
        const cupon = await (response.json());
        cupon.forEach(e => {
            cuponLocal.push(new Cupon(e.id, e.codigo, e.beneficio))
        })
        DB_CUPONES = [...cuponLocal];
        cuponSeleccionado = cargarCuponStorage()
    } else {
        controller.abort();
        console.log('error de conexion');
    }

    
    return response.ok;
}


export const quitarCupon = () => {

    localStorage.removeItem('cupon');
    cuponSeleccionado = [];
    notificaciones('Cupon quitado con exito', 'orange');

}

export let cuponSeleccionado = cargaCupones();