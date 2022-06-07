import { renderizaTestimonio } from './componentes/testimonios.js';
class Testimonio {

    constructor(id, nombre, foto, cargo, comentario) {
        this.id = id;
        this.nombre = nombre;
        this.cargo = cargo;
        this.foto = foto;
        this.comentario = comentario;

    }


}
/*const testimonio1 = new Testimonio(1, 'Lorena', 'client.jpg', 'Profesora', 'Los mejores precios que he visto en internet.');
const testimonio2 = new Testimonio(2, 'Natalia', 'client.jpg', 'Agente inmobiliario', 'Increibles los descuentos que podes encontrar');
const testimonio3 = new Testimonio(3, 'Roxana', 'client.jpg', 'Vendedora', 'Compre un lunes a la mañana y a la tarde ya lo recibi!!');

let testimonios = [testimonio1, testimonio2, testimonio3];*/
let testimonios = [new Testimonio()];


const cargaTestimonios = async () => {
    let testimonioLocal = [];
    let controller = new AbortController();
    const response = await fetch('json/testimonios.json', { signal: controller.signal });
    if (response.ok === true) {
        const testimonio = await (response.json());
        testimonio.forEach(e => {
            testimonioLocal.push(new Testimonio(e.id, e.nombre, e.foto, e.cargo, e.comentario))
        });
        testimonios = [...testimonioLocal];
       
    } else {
        controller.abort();
        console.log('error de conexion');
    }
    
    //generarCards(idSeccion,cantidad);
    return response.ok;
}




export const generarTestimonios = (idSeccion, cantidad) => {



    if (testimonios.length > 1) {
        let arrTestimonios = [...testimonios];
        renderizaTestimonio(idSeccion, arrTestimonios, 5);
    } else {
        cargaTestimonios();
        cargaTestimonios().then(() => {
            generarTestimonios(idSeccion, cantidad);
        })
        cargaTestimonios().catch(err => {
            console.log(err)
        })
    }
}
