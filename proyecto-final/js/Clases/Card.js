import { renderizaCard } from './componentes/Cards.js';
class Card {

    constructor(id, tipo, titulo, imagen, descripcion, orden) {
        this.id = id;
        this.tipo = tipo;
        this.titulo = titulo;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.orden = orden;

    }


}

const card1 = new Card(1, 'seccion_elegirnos', 'Recibilo en 24h', 'recibilo.svg', 'Dependiendo donde vives, lo recibes en 24h', 1);
const card2 = new Card(2, 'seccion_elegirnos', 'Envios gratis', 'envio.svg', 'A todo el Pais para compras mayores a $6000', 2);
const card3 = new Card(3, 'seccion_elegirnos', 'Prendas de Calidad', 'calidad.svg', 'Trabajamos productos originales de grandes marcas', 3);
const card4 = new Card(4, 'seccion_sucursales', 'Nueva Córdoba', 'sucursal.png', 'Obispo Trejo 400 - Loc. A', 5);
const card5 = new Card(5, 'seccion_sucursales', 'Córdoba Shopping', 'sucursal.png', 'Misiones 132 - 2do piso', 6);
const card6 = new Card(6, 'seccion_sucursales', 'Puerto Madero', 'sucursal.png', 'Justo Moreau 50 ', 6);

let cards = [new Card()];


const cargaCards = async () => {
    let cardsLocal = [];
    let controller = new AbortController();
    const response = await fetch('json/cards.json', { signal: controller.signal });
    if (response.ok === true) {
        const card = await (response.json());
        card.forEach(e => {
            cardsLocal.push(new Card(e.id, e.tipo, e.titulo, e.imagen, e.descripcion, e.orden))
        })
        cards = [...cardsLocal];
    } else {
        controller.abort();
        console.log('error de conexion');
    }

    
    return response.ok;
}



export const generarCards = (idSeccion, cantidad) => {
     
    // consultamos si esta cargado el array de cards sino esta cargado usamos un fetch al archivo .json
    if (cards.length > 1) {
        let arrCards = [...cards].filter(arrCards => arrCards.tipo == idSeccion);
        renderizaCard(idSeccion, arrCards, cantidad);
    } else {
        cargaCards();
        cargaCards().then(() => {
            generarCards(idSeccion, cantidad);
        })
        cargaCards().catch(err => {
            console.log(err)
        })
    }

}