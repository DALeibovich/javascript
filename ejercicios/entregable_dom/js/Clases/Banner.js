/*********** 
Autor: David Leibovich 
Clase para generar banners y ubicarlos segun donde se indique.
Funciones: generarBanners, ordenarBanners, ordenarBannersXorden, ordenarBannersXnombre.
***********/

class Banner {

    constructor(id, titulo, bajada, image, nombreBoton, linkDestino, posicionPagina, orden) {
        this.id = id;
        this.titulo = titulo;
        this.bajada = bajada;
        this.image = image;
        this.nombreBoton = nombreBoton;
        this.linkDestino = linkDestino;
        this.orden = orden;
        this.posicionPagina = posicionPagina;
    }

}


// Funcion para ordenar los banner segun el campo indicado y si es asc o des
const ordenarBanners = (arr, ordenarpor, ascdesc) => {
    if (ordenarpor == 'orden') ordenarBannersXorden(arr, ascdesc);
    if (ordenarpor == 'nombre') ordenarBannersXnombre(arr, ascdesc);
    if (ordenarpor == 'id') ordenarBannersXid(arr, ascdesc);
}


const ordenarBannersXnombre = (arr, ascdesc) => {
    let ret = 1;
    if (ascdesc == 'descendente') ret = -1;
    arr.sort((a, b) => {
        if (a.nombre > b.nombre) ret = -1;
        return ret;
    });

    return arr;
}

const ordenarBannersXid = (arr, ascdesc) => {
    arr.sort((a, b) => a.id - b.id);
    if (ascdesc == 'descendente') {
        arr.sort((a, b) => b.id - a.id);
    }
    return arr;
}

const ordenarBannersXorden = (arr, ascdesc) => {
    arr.sort((a, b) => a.orden - b.orden);
    if (ascdesc == 'descendente') {
        arr.sort((a, b) => b.orden - a.orden);
    }
    return arr;
}



const banner1 = new Banner(1, 'a Bienvenido', 'Tienda House es la tienda numero 1 del mundo', '', 'Conocé mas', '/quienes-somos', 'Home-top, Home-medio', 5);
const banner2 = new Banner(2, 'b 15% OFF', 'Compra en todo el sitio con un 15% de descuento. Usa el cupon <b>HOUSE15</b>.', '', 'Lo aprovecho!!', '/promos', 'Home-top, Home-pie', 2);
const banner3 = new Banner(3, 'c Envio gratis', 'Del 20 al 31 de mayo envio gratis. Minimo de compra $6000', '', 'Enviame gratis!', '/promos', 'Home-pie, Home-medio', 3);
const banner4 = new Banner(4, 'd ¿Tu primer compra?', 'Te regalamos $500 en tu primer compra en el sitio!. usa el cupon <b>HOUSE500</b>. Minimo de compra $1000', '', 'Compra ya!', '/promos', 'Home-top, Home-pie', 4);
const banner5 = new Banner(5, 'e Promo del año', 'En todo el año disfruta descuentos', '', 'Saber mas!!!', '/saber-mas', 'Home-pie', 9);
const banner6 = new Banner(6, 'f Convenio con CODERHOUSE', 'Mencionando TiendaHouse, 20% en todos sus cursos', '', 'Saber mas!!!', 'https://coderhouse.com', 'Home-medio, Home-pie, Home-top', 7);
const arrBanner = [banner1, banner2, banner3, banner4, banner5, banner6];


// Exportamos la Funcion que genera los banner en el DOM segun donde se indique que deben aparecer, y el orden
export const generarBanners = (posicionPagina = 'Home-top', cantidad = 1, ordenarpor = 'orden', forma = 'asc') => {
    let cont = 0;
    // Hacemos copia del array de objetos original.
    let arrBannerLocal = [...arrBanner];
    // Filtra y ordena el array de banners segun el parametro posicionPagina
    let arrResultados = arrBannerLocal.filter(arrBannerLocal => arrBannerLocal.posicionPagina.includes(posicionPagina));
    //arrResultados.sort((a, b) => a.orden - b.orden);

    //ordena segun y forma pasada por paramtro
    ordenarBanners(arrResultados, ordenarpor, forma);

    console.log(arrResultados); //dejado para debug

    for (let banner of arrResultados) {
        if (cont++ < cantidad) {
            document.getElementById(`Banner_${posicionPagina}`).innerHTML +=
                `<div style="background-color:#f0f0f0; padding:6px; margin:6px">
            <h3>${banner.titulo.toUpperCase()}</h3>
            <p>${banner.bajada}</p>            
            <a href="${banner.linkDestino}">${banner.nombreBoton}</a><br>
          </div>`;
        }
    };

    arrResultados = [];
}

//export const arrBanner = [banner1, banner2, banner3, banner4];


