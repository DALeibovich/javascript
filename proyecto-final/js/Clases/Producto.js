
import { renderizaCardProducto, renderizaPrecioBitcoin } from './componentes/productos.js';
const API_PRODUCTO = 'https://json.ar/apis/archivos/a064fc2360a50fb24d515ad7b14120fa.json';
//const API_PRODUCTO = 'json/DB_productos.json';
export class Producto {

    constructor(id=0, sku='', categoria='', nombre='', imagen='', precio='', descripcion='', stock=[], marca='') {
        this.id = id;
        this.sku = sku;
        this.categoria = categoria;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.precioBitcoin = precio/BTC;
        this.descripcion = descripcion;
        this.stock = stock;
        this.marca = marca;
        this.talle = talle(stock);


    }
   
}



let BTC = 0;

    



export const actualizaPrecioBitcoin = () => {
    fetch("https://criptoya.com/api/btc/ars")
    .then(response => response.json())
    .then(({buenbit}) => {
        BTC = parseFloat(buenbit.ask);
       
      
        arrProductos.forEach((s) => {
            s.precioBitcoin = s.precio/BTC;
            s.precioBitcoin = s.precio/BTC;
       
        });
        renderizaPrecioBitcoin();
    })
    .catch(error => {
        console.error(error)
        
    })
    

}


const talle = (stock) => {
    let ret = "";
   if(stock !== undefined){
       stock.forEach((s) => {
        ret += s.talle + " ";
    });
    }

    return ret;

}

export const cargarProductosDB = (valor) => {
    return new Promise((res, rej) => {
        if (valor == true) {
            //fetch("json/DB_productos.json")
            fetch(API_PRODUCTO)
                .then(response => response.json(0))
                .then(data => {
                    for (let elemento of data) {

                        let producto = new Producto(elemento.id, elemento.sku, elemento.categoria, elemento.nombre, elemento.imagen, elemento.precio, elemento.descripcion, elemento.stock, elemento.marca);
                        arrProductos.push(producto);

                    };
                    // Elimino el primero objeto vacio
                    arrProductos.shift();
                })
            res(arrProductos)
        }
        rej("No tiene los permisos necesarios para hacer esta consulta")
    })
}


// Filtra el array segun el campo a filtrar (nombre, categoria, marca, descripcion) y valor pasado

const filtrarPor = (arr, filtro) => {

    let arrResultados = [...arr];


    if (filtro.filtrarValor !== undefined && filtro.filtrarValor !== '') {
        let c = filtro.filtrarCampo.split(',');
        let v = filtro.filtrarValor.split(',');

        //for(let f of v){
        for (let i = 0; i < c.length; i++) {
            let valor = v[i];
            let campo = c[i];


            if (campo === 'buscador') {
                //arrResultados = arr.filter(arr => arr[campo].toLowerCase().includes(valor));
                arrResultados = arr.filter(arr => arr['nombre'].toLowerCase().includes(valor) || arr['marca'].toLowerCase().includes(valor) || arr['categoria'].toLowerCase().includes(valor) || arr['descripcion'].toLowerCase().includes(valor));
            } else {
                arrResultados = arrResultados.filter(arr => arr[campo].toLowerCase().includes(valor.toLowerCase()));

            }
        };


    }

    return arrResultados;
}

const ordenarPor = (arr, campo = 'precio', ascdesc = 'ascendente') => {

    let ret = 1;
    let retInv = -1;
    let retorno;
    if(ascdesc === 'descendente'){
        ret = -1;
        retInv = 1;
    }

    if (campo === 'precio') retorno = ordenarProductoXprecio(arr, ascdesc);
    if (campo === 'categoria') retorno = ordenarProductoXcategoria(arr, ret, retInv);
    if (campo === 'nombre') retorno = ordenarProductoXnombre(arr, ret, retInv);
    if (campo === 'marca') retorno = ordenarProductoXmarca(arr, ret, retInv);
    if (campo === 'sku') retorno = ordenarProductoXsku(arr, ret, retInv);
    return retorno;
}

const ordenarProductoXsku = (arr, ret, retInv) => {

    arr.sort((a, b) => {

        return (a.sku.toLowerCase() < b.sku.toLowerCase()) ? retInv : (a.sku.toLowerCase() > b.sku.toLowerCase()) ? ret : 0;

    });

    return arr;

}
const ordenarProductoXnombre = (arr, ret, retInv) => {

    arr.sort((a, b) => {

        return (a.nombre.toLowerCase() < b.nombre.toLowerCase()) ? retInv : (a.nombre.toLowerCase() > b.nombre.toLowerCase()) ? ret : 0;

    });
    return arr;

}

const ordenarProductoXmarca = (arr, ret, retInv) => {

    arr.sort((a, b) => {
        return (a.marca.toLowerCase() < b.marca.toLowerCase()) ? retInv : (a.marca.toLowerCase() > b.marca.toLowerCase()) ? ret : 0;

    });

    return arr;

}

const ordenarProductoXcategoria = (arr, ret, retInv) => {

    arr.sort((a, b) => {
        return (a.categoria.toLowerCase() < b.categoria.toLowerCase()) ? retInv : (a.categoria.toLowerCase() > b.categoria.toLowerCase()) ? ret : 0;

    });
    return arr;

}

const ordenarProductoXprecio = (arr, ascdesc) => {
    arr.sort((a, b) => a.precio - b.precio);
    if (ascdesc == 'descendente') {
        arr.sort((a, b) => b.precio - a.precio);
    }
    return arr;
}



export const generarProductosCarrito = (idSeccion, arr) => {
    let arrRet = [];


    if(arrProductos[0].sku !== '') {
    let arrProductosLocal = [...arrProductos];
    arr.forEach((carro) => {

        let ret = arrProductosLocal.find(producto => producto.sku == carro.sku) ?? 0;
        if (ret != 0) {
            let reta = Object.assign(carro, ret);

            arrRet.push(reta);
        }



    });
}

    ordenarProductoXsku(arrRet, -1, 1);
    renderizaCardProducto(idSeccion, arrRet);

}

export const importeBTC = (importe) =>{
return importe / BTC;
    
}

export const generarProductosFavorito = (idSeccion, arr) => {
    let arrRet = Array();
    arr.forEach((favorito) => {
        
        let ret = arrProductos.find(producto => producto.sku == favorito) ?? 0;
        if (ret != 0) arrRet.push(ret);

    });
    renderizaCardProducto(idSeccion, arrRet);
}

export const generarProductos = (idSeccion, filtro = { filtrarCampo: undefined, filtrarValor: undefined }, rango = { ini: 0, cantidad: 100 }, ordenarpor = 'precio', formaOrden = 'ascendente',loading=true) => {
    
    let cont = 0;
    // Hacemos copia del array de objetos original.
    let arrProductosLocal = [...arrProductos];

    // Filtra el array de productos segun el  parametro  @filtro      
    arrProductosLocal = filtrarPor(arrProductosLocal, filtro);

    // Ordena el array segun parametro: ordenarpor
    arrProductosLocal = ordenarPor(arrProductosLocal, ordenarpor, formaOrden);

    // usamos el array diltrado si estamos paginando
    (rango.ini === 0) ? arrProductosFiltrado = arrProductosLocal : arrProductosLocal = arrProductosFiltrado;

    // Recorta el array segun el parametro @rango  (se puede utilizar para paginacion)
    arrProductosLocal = arrProductosLocal.slice(parseInt(rango.ini), parseInt(rango.cantidad));

    // renderiza la card de producto segun el array y en la posicion del parametro @idSeccion
    renderizaCardProducto(idSeccion, arrProductosLocal, loading);
    
}



/*const producto1 = new Producto(1, 'polo01', 'Camisas', 'Camisa dos Caballos', 'p8.png', 4500, 'Camisa de seda con logo de 2 caballos', [{ talle: "S", unidades: 3 }, { talle: "M", unidades: 4 }, { talle: "L", unidades: 4 }, { talle: "XL", unidades: 4 }], 'Polo');
const producto2 = new Producto(2, 'laco02', 'Camisas', 'Camisa Yacare', 'p9.png', 19500, 'Camisa manga cortas de lino', [{ talle: "S", unidades: 3 }, { talle: "L", unidades: 4 }, { talle: "XL", unidades: 4 }], 'Lacoste');
const producto3 = new Producto(3, 'polo03', 'Vestidos', 'Vestido corto Potrillo', 'p4.png', 14500, 'Vestidos de Lino eslastizado', [{ talle: "S", unidades: 3 }, { talle: "M", unidades: 4 }, { talle: "XL", unidades: 4 }], 'Polo');
const producto4 = new Producto(4, 'laco03', 'Vestidos', 'Vestido largo Cocodrilo', 'p5.png', 12500, 'Vestidos de Lino con guardas de tul', [{ talle: "S", unidades: 4 }, { talle: "L", unidades: 4 }], 'Lacoste');
const producto5 = new Producto(5, 'laco90', 'Camisas', 'Camisa Lagartija', 'p2.png', 11400, 'Camisa manga cortas de lino', [{ talle: "S", unidades: 3 }], 'Lacoste');
const producto6 = new Producto(6, 'laco04', 'Camisas', 'Camisa Chelco', 'p10.png', 9800, 'Camisa manga cortas de lino', [{ talle: "XL", unidades: 4 }], 'Lacoste');
*/
export let arrProductos = [new Producto()];
export let arrProductosFiltrado;



