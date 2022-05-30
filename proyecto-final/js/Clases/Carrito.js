import { arrProductos, generarProductosCarrito } from "./Producto.js";

class Carrito {

    constructor(idHas, arrProductosCarrito) {

        this.idCliente;
        this.arrProductosCarrito = arrProductosCarrito;
        this.estado = "Nuevo";
        this.fecha = new Date();
        this.cuponAplicables = '';
        this.cpEnvio = '';
        if (this.idHash === undefined) this.idHash = this.generateRandomString(16).toString();

    }

    agregarProductoCarrito(sku, talle = 'M', cantidad = 1) {
        //var arr = JSON.parse(localStorage.getItem('carrito'));
        if(this.verificaStock(sku, talle, cantidad) >= 0){
        let indice = this.arrProductosCarrito.findIndex(producto => (producto.sku == sku && producto.talleElegido == talle));
        if (indice === -1 || indice === null) {
            this.arrProductosCarrito.push({ sku: sku, talleElegido: talle, cantidad: cantidad });
        } else {
            this.arrProductosCarrito[indice].cantidad += cantidad;
        };
        
        localStorage.setItem('carrito', JSON.stringify(this.arrProductosCarrito));
    }else{

        alert("no hay stock");
    }
   
        console.log(this.arrProductosCarrito);
    }

    verificaStock = (sku, talle, cantidad = 0) => {
        let { stock } = arrProductos.find(producto => producto.sku === sku);
        let { unidades } = stock.find(stock => stock.talle === talle);

        let carritoStorage = JSON.parse(localStorage.getItem('carrito')) ?? []
        let cantidadCarrito = carritoStorage.find(car => car.sku === sku && car.talleElegido === talle) ?? [];

        let disponible = parseInt(unidades - parseInt(cantidadCarrito['cantidad'] + cantidad));
       // console.log((isNaN(disponible)) ? unidades : disponible);
        return (isNaN(disponible)) ? unidades : disponible;

    }

   

    quitarProductoCarrito = (sku, talleElegido) =>{
        let arr = JSON.parse(localStorage.getItem('carrito')) ?? [];  
        let indice = arr.findIndex(carrito => carrito.sku === sku && carrito.talleElegido === talleElegido); 
        console.log(indice);
        arr.splice(indice, 1);
        localStorage.setItem('carrito',JSON.stringify(arr));
        carrito.arrProductosCarrito = [...arr];
        generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);
        return arr;
    }

    cargarCarritoStorage = () => {
        this.arrProductosCarrito = JSON.parse(localStorage.getItem('carrito')) ?? [];
        // console.log(this.arrProductosCarrito);

    }
    cantidadProductos() {
        let suma = 0;
        for (let producto of this.arrProductos) {
            suma += producto.cantidad;
        }
        return suma;
    }

    importeTotal() {

        let total = 0;
        for (let producto of this.arrProductos) {
            total += producto.precio;

        };
        return total;
    }


    generateRandomString = (num) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1 = Math.random().toString(36).substring(2, num);

        return result1;
    }

}




export const carrito = new Carrito();
