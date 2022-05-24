/* Se importan los objetos y funciones necesarias */
import {generarBanners} from './Clases/Banner.js';
import {generarTestimonios} from './Clases/Testimonio.js';
import {generarCards} from './Clases/Card.js';
import {generarProductos,arrProductos} from './Clases/Producto.js';
import {carrito} from './Clases/Carrito.js';


/* Genera la home dinamica de banners, cards, y testimonios */
generarBanners('Home-top',5,'orden','ascendente'); //carga el slider principal
generarBanners('Home-medio',1); //carga el banner del medio
generarCards('seccion_elegirnos',5); //carga las cards de contenidos de la seccion "porque elegirnos"
generarCards('seccion_sucursales',5); //carga las cards de sucursales
generarTestimonios('seccion_testimonio',5); //carga los testimonios de la home

/* Genera la seccion de productos de la home segun parametros | Se plasman distintas opciones para cargar*/
//generarProductos('productosHome');
//generarProductos('productosHome',{filtrarCampo: undefined, filtrarValor: undefined},{ini:0,cantidad:15},'precio','ascendente');
generarProductos('productosHome',{filtrarCampo:"marca", filtrarValor:"Lacoste"},{ini:0,cantidad:15},'nombre','ascendente');
//generarProductos('productosHome',{filtrarCampo:"categoria", filtrarValor:"Camisas"},{ini:2,cantidad:20},'nombre','ascendente');


/* Funciones para agregar y quitar favorito - Se geners un array de objetos de productos */
const arrFavorito = [];
const agregarFavorito = (sku) =>{
    arrFavorito.push(arrProductos.filter(arrProductos => arrProductos.sku.includes(sku)));
}
const quitarFavorito = (sku) =>{
    arrFavorito.splice(arrFavorito.indexOf(sku), 1);
}
agregarFavorito('polo01');
agregarFavorito('laco02');
agregarFavorito('laco03');
console.log(`Productos en favoritos: `);
console.log(arrFavorito);
quitarFavorito('laco02');
console.log(`Productos en favoritos: `);
console.log(arrFavorito);

/* Simula el carrito de compra */

let cantidad = 1;
carrito.agregarProductoCarrito('polo01', cantidad);
carrito.agregarProductoCarrito('laco02');
console.log(`Productos en el carrito: `);
console.log(carrito.arrProductos);


