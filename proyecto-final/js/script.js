/* Se importan los objetos y funciones necesarias */
import { generarBanners } from './Clases/Banner.js';
import { generarTestimonios } from './Clases/Testimonio.js';
import { generarCards } from './Clases/Card.js';
import { arrProductos, actualizaPrecioBitcoin, cargarProductosDB, generarProductos, generarProductosCarrito, generarProductosFavorito } from './Clases/Producto.js';
import { favorito } from './Clases/Favorito.js';
import { carrito } from './Clases/Carrito.js';
import { habilitaBotones, notificaciones } from './funciones.js';


habilitaBotones('btnFavorito',false);
habilitaBotones('btnCarrito',false);
habilitaBotones('buscador',false);


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


document.getElementById('productosHome').innerHTML = `
<div style="height:200px; margin-top:50px " align="center">
<i class="fa fa-spinner fa-spin" style="font-size:80px" id="productosHome_spinner"></i>
</div>
` ;

/* Genera la home dinamica de banners, cards, y testimonios */
generarBanners('Home-top', 5, 'orden', 'ascendente'); //carga el slider principal
generarBanners('Home-medio', 1); //carga el banner del medio
generarCards('seccion_elegirnos', 5); //carga las cards de contenidos de la seccion "porque elegirnos"
generarCards('seccion_sucursales', 5); //carga las cards de sucursales
generarTestimonios('seccion_testimonio', 5); //carga los testimonios de la home



function cargarInicialProductos() {

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
     document.getElementById('btnCarrito_total').innerHTML = carrito.cantidadProductos();
     document.getElementById('btnFavorito_total').innerHTML = favorito.cantidadProductos();
   
   
    //document.getElementById('btnFavorito_total').innerHTML = favorito.cantidadProductos;

}




 
/* Intentamos cargar los datos desde una api o archivo json:
 -si la arga demora, notifica cada 10 segundo que esta lento
 

*/
let intentos = 0;
const interval = setInterval(() => {
   /// usamos la funcion "cargarProductosDB" hecha con fetch para cargar los datos de api o archivo json
    cargarProductosDB(true)
        .then(promesa => {
            intentos++;
            
            const interval2 = setInterval(() => {
                console.log(intentos)
                if (arrProductos.length > 1) {
                    // si hay productos en el array cargamos en el front y habilitamos carrito, favorito y buscador
                    cargarInicialProductos();
                    habilitaBotones('btnFavorito',true);
                    habilitaBotones('btnCarrito',true);
                    habilitaBotones('buscador',true);
                    clearInterval(interval2);
                    clearInterval(interval);

                }
                //avisa si se tarda mas de lo normal en cargar los productos
                if( intentos > 0 && intentos++ % 8 === 0) notificaciones('La carga de productos esta tardando mas de lo normal','gray')
            }, 1000)
        })
        .catch(error => {
            console.log("No se pudo cargar los productos")
            clearInterval(interval)
        })
        .finally(() => {
            clearInterval(interval);
        }

        )
       
        console.log(arrProductos)
}, 1000)


//actualizaPrecioBitcoin();
setInterval(actualizaPrecioBitcoin(),500000)







