class Carrito{

    constructor(idHash){
       
        this.idCliente;
        this.arrProductos =[];
        this.estado = "Nuevo";
        this.fecha = new Date();
        this.cuponAplicables = '';
        this.cpEnvio = '';
        if( this.idHash===undefined) this.idHash = this.generateRandomString(16).toString();

    }

    agregarProductoCarrito(productoId, cantidad=1){
        this.arrProductos.push({productoId: productoId, cantidad: cantidad});
    }

    quitarProductoCarrito(productoId){
        this.arrProductos.splice(this.arrProductos.indexOf(productoId),1);
    }

    cantidadProductos(){
        let suma = 0;
        for(let producto of this.arrProductos){
            suma += producto.cantidad;
        }
        return suma;
    }

    importeTotal(){

        let total = 0;
        for(let producto of this.arrProductos){
            total += producto.precio;

        };
        return total;
    }


      generateRandomString = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= Math.random().toString(36).substring(2,num);       

        return result1;
    }
    
}

export const carrito = new Carrito();
