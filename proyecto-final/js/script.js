/* Se importan los objetos y funciones necesarias */
import { generarBanners } from './Clases/Banner.js';
import { generarTestimonios } from './Clases/Testimonio.js';
import { generarCards } from './Clases/Card.js';
import { generarProductos, generarProductosCarrito, generarProductosFavorito } from './Clases/Producto.js';
import { favorito } from './Clases/Favorito.js';
import { carrito } from './Clases/Carrito.js';






/* Evento de boton carrito */
const botonCarrito = document.getElementById('btnCarrito');
const modalCarrito = document.getElementById('productosCarrito');
botonCarrito.addEventListener('click', () => {
    generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);
})


/* Evento de boton favorito */
const botonFavorito = document.getElementById('btnFavorito');
const modalFavorito = document.getElementById('productosFavorito');
botonFavorito.addEventListener('click', () => {
    generarProductosFavorito('productosFavorito', favorito.arrFavorito);

})


/* filtros y orden */
const filtroMarca = document.getElementById('selMarca');
const filtroCategoria = document.getElementById('selCategoria');
const filtroTalle = document.getElementById('selTalle');
const selOrden = document.getElementById('selOrden');
const selOrdenAsc = document.getElementById('selOrdenAsc');
const filtroBuscador = document.getElementById('buscador');
const resultadoBuscador = document.getElementById('resultadoBuscador');

let campoFiltro = [];
let valorFiltro = [];
let campoOrden = "precio";
let campoOrdenAsc = "ascendente";


function restaurarFiltros() {
    let ret = false
    campoFiltro = JSON.parse(sessionStorage.getItem('campoFiltro')) ?? [];
    valorFiltro = JSON.parse(sessionStorage.getItem('valorFiltro')) ?? [];
    campoOrden = JSON.parse(sessionStorage.getItem('campoOrden')) ?? [];
    campoOrdenAsc = JSON.parse(sessionStorage.getItem('campoOrdenAsc')) ?? [];
    console.log(valorFiltro[0]);
    if (valorFiltro.length != 0) {
        ret = true;
        for (let i = 0; i < valorFiltro.length; i++) {
            if (campoFiltro[i] == 'categoria') filtroCategoria.value = valorFiltro[i];
            if (campoFiltro[i] == 'marca') filtroMarca.value = valorFiltro[i];
            if (campoFiltro[i] == 'talle') filtroTalle.value = valorFiltro[i];
        };

        selOrden.value = campoOrden;
        selOrdenAsc.value = campoOrdenAsc;

        generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);

    }
    return ret;
}
function verificaFiltro() {
    campoFiltro = [];
    valorFiltro = [];



    if (filtroMarca.value != '-') {
        campoFiltro.push("marca");
        valorFiltro.push(filtroMarca.value.toLowerCase());
    }

    if (filtroCategoria.value != '-') {
        campoFiltro.push("categoria");
        valorFiltro.push(filtroCategoria.value.toLowerCase());
    }

    if (filtroTalle.value != '-') {
        campoFiltro.push("talle");
        valorFiltro.push(filtroTalle.value.toLowerCase());
    }

    console.log(campoFiltro.length)
    if (campoFiltro.length == 0) {
        campoFiltro.push(undefined);
        valorFiltro.push(undefined);
    }

    campoOrden = selOrden.value.toLowerCase();
    campoOrdenAsc = selOrdenAsc.value.toLowerCase();
    sessionStorage.setItem("campoFiltro", JSON.stringify(campoFiltro));
    sessionStorage.setItem("valorFiltro", JSON.stringify(valorFiltro));
    sessionStorage.setItem("campoOrden", JSON.stringify(campoOrden));
    sessionStorage.setItem("campoOrdenAsc", JSON.stringify(campoOrdenAsc));
}


/* Eventos de selector de filtros y orden */
filtroMarca.addEventListener('change', () => {
    verificaFiltro();
    generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})

filtroCategoria.addEventListener('change', () => {
    verificaFiltro();
    generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})

filtroTalle.addEventListener('change', () => {
    verificaFiltro();
    generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})

filtroBuscador.addEventListener('input', () => {
    let texto = filtroBuscador.value.toLowerCase();
    (texto === '') ? resultadoBuscador.style.display = 'none' : resultadoBuscador.style.display = 'block';
    generarProductos('resultadoBuscador', { filtrarCampo: "buscador", filtrarValor: texto }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})

selOrden.addEventListener('change', () => {
    verificaFiltro();
    generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})

selOrdenAsc.addEventListener('change', () => {
    verificaFiltro();
    generarProductos('productosHome', { filtrarCampo: campoFiltro.toString(), filtrarValor: valorFiltro.toString() }, { ini: 0, cantidad: 15 }, campoOrden, campoOrdenAsc);
})


/* Genera la home dinamica de banners, cards, y testimonios */
generarBanners('Home-top', 5, 'orden', 'ascendente'); //carga el slider principal
generarBanners('Home-medio', 1); //carga el banner del medio
generarCards('seccion_elegirnos', 5); //carga las cards de contenidos de la seccion "porque elegirnos"
generarCards('seccion_sucursales', 5); //carga las cards de sucursales
generarTestimonios('seccion_testimonio', 5); //carga los testimonios de la home


/* obtencion de info sessionstorages y localstorage*/

carrito.cargarCarritoStorage(); // Carga el carrito de localStorage
favorito.cargarFavoritoStorage(); // Carga favoritos de localStorage

//restaura los filtro de la sessionStorage y los ejecuta., SI NO hay filtro muestra todos los productos
if (restaurarFiltros() == false) {

    /* Genera la seccion de productos de la home segun parametros (Se deja comentado distintas opciones para cargar) */
    generarProductos('productosHome');
    //generarProductos('productosHome',{filtrarCampo: undefined, filtrarValor: undefined},{ini:0,cantidad:15},'precio','ascendente');
    //generarProductos('productosHome',{filtrarCampo:"marca", filtrarValor:"Lacoste"},{ini:0,cantidad:15},'nombre','ascendente');
    //generarProductos('productosHome',{filtrarCampo:"categoria", filtrarValor:"Camisas"},{ini:2,cantidad:20},'nombre','ascendente');
}




