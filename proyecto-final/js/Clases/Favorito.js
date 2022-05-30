import { generarProductosFavorito } from "./Producto.js";
/* Funciones para agregar y quitar favorito - Se geners un array de objetos de productos */
class Favorito {

    constructor(arrFavorito = []) {
        this.arrFavorito = arrFavorito;
    }


    cargarFavoritoStorage = () => {
        this.arrFavorito = JSON.parse(localStorage.getItem('favorito')) ?? [];
        //console.log(this.arrFavorito);
    }

    agregarFavorito = (sku) => {
        // arrFavorito.push(arrProductos.filter(arrProductos => arrProductos.sku.includes(sku)));
        var arr = JSON.parse(localStorage.getItem('favorito')) ?? [];
        arr.push(sku);
        this.arrFavorito = [...new Set(arr)];
        localStorage.setItem('favorito', JSON.stringify(this.arrFavorito));
        // console.log(this.arrFavorito);

    }


    quitarFavorito = (sku) => {
        let arr = JSON.parse(localStorage.getItem('favorito')) ?? [];
        let indice = arr.indexOf(sku);
        console.log(indice);
        arr.splice(indice, 1);
        localStorage.setItem('favorito', JSON.stringify(arr));
        generarProductosFavorito('productosFavorito', arr);
        return arr;
    }



}






export const favorito = new Favorito();

