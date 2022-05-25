import {renderizaCard} from './componentes/Cards.js';
class Card {

    constructor(id, tipo, titulo, imagen, descripcion,orden) {
       this.id = id;
       this.tipo = tipo;
       this.titulo = titulo;
       this.imagen = imagen;
       this.descripcion = descripcion;
       this.orden = orden;   
    
    }
      

}

const card1 = new Card (1,'seccion_elegirnos','Recibilo en 24h', 'recibilo.svg','Dependiendo donde vives, lo recibes en 24h',1);
const card2 = new Card (2,'seccion_elegirnos','Envios gratis', 'envio.svg','A todo el Pais para compras mayores a $6000',2);
const card3 = new Card (3,'seccion_elegirnos','Prendas de Calidad', 'calidad.svg','Trabajamos productos originales de grandes marcas',3);
const card4 = new Card (4,'seccion_sucursales','Nueva Córdoba', 'sucursal.png','Obispo Trejo 400 - Loc. A',5);
const card5 = new Card (5,'seccion_sucursales','Córdoba Shopping', 'sucursal.png','Misiones 132 - 2do piso',6);
const card6 = new Card (6,'seccion_sucursales','Puerto Madero', 'sucursal.png','Justo Moreau 50 ',6);

const cards = [card1, card2, card3, card4, card5, card6];

export const generarCards = (idSeccion, cantidad) =>{
    const arrCards = [...cards].filter(arrCards => arrCards.tipo == idSeccion);   
    renderizaCard(idSeccion,arrCards,cantidad);
}