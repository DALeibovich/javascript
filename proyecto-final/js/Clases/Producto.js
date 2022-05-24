import {renderizaCardProducto} from './componentes/productos.js';
    class Producto {

        constructor(id, sku, categoria, nombre, imagen, precio, descripcion, stock, marca) {
            this.id = id;
            this.sku = sku;
            this.categoria = categoria;
            this.nombre = nombre;                      
            this.imagen = imagen;
            this.precio = precio;
            this.descripcion = descripcion;
            this.stock = stock;
            this.marca = marca;
           
    }

    }

        
  

    // Filtra el array segun el campo a filtrar y valor pasado
    const filtrarPor = (arr, filtro) => { 
        let arrResultados = [...arr];
        if(filtro.filtrarCampo === 'marca' || filtro.filtrarCampo === 'categoria'){       
             arrResultados = arr.filter(arr => arr[filtro.filtrarCampo].includes(filtro.filtrarValor));
            
        }
        return arrResultados;
    }

    const ordenarPor = (arr, campo='precio', ascdesc='ascendente') => {  
        
        if(campo === 'precio') ordenarProductoXprecio(arr, ascdesc); 
        if( campo === 'categoria') ordenarProductoXcategoria(arr, ascdesc);
        if( campo === 'nombre') ordenarProductoXnombre(arr, ascdesc);
        if( campo === 'marca') ordenarProductoXmarca(arr, ascdesc);
       
    }

    const ordenarProductoXnombre = (arr, ascdesc) => {
        let ret = 1;
        if (ascdesc == 'descendente') ret = -1;
        arr.sort((a, b) => {
            if (a.nombre > b.nombre) ret = -1;
            return ret;
        }); 
    
       // return arr;
    }

    const ordenarProductoXmarca = (arr, ascdesc) => {
        let ret = 1;
        if (ascdesc == 'descendente') ret = -1;
        arr.sort((a, b) => {
            if (a.nombre > b.nombre) ret = -1;
            return ret;
        }); 
    
       // return arr;
    }

    const ordenarProductoXcategoria = (arr, ascdesc) => {
        let ret = 1;
        if (ascdesc == 'descendente') ret = -1;
        arr.sort((a, b) => {
            if (a.categoria > b.categoria) ret = -1;
            return ret;
        });
    
        //return arr;
    }
    
    const ordenarProductoXprecio = (arr, ascdesc) => {
        arr.sort((a, b) => a.precio - b.precio);
        if (ascdesc == 'descendente') {
            arr.sort((a, b) => b.precio - a.precio);
        }
        //return arr;
    }
    
  
    const producto1 = new Producto (1,'polo01','Camisas','Camisa dos Caballos','p8.png',10500,'Camisa de seda con logo de 2 caballos',{s:5,M:5,L:4,XL:2},'Polo');
    const producto2 = new Producto (2,'laco02','Camisas','Camisa Yacare','p9.png',19500,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto3 = new Producto (3,'polo03','Vestidos','Vestido corto Potrillo','p4.png',1500,'Vestidos de Lino eslastizado',{s:1,M:1,L:0,XL:2},'Polo');
    const producto4 = new Producto (4,'laco03','Vestidos','Vestido largo Cocodrilo','p5.png',12500,'Vestidos de Lino con guardas de tul',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto5 = new Producto (5,'laco90','Camisas','Camisa Lagartija','p2.png',11400,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto6 = new Producto (6,'laco04','Camisas','Camisa Chelco','p10.png',9800,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    export const arrProductos = [producto1,producto2,producto3,producto4,producto5,producto6];
    

   export const generarProductos = (idSeccion, filtro={filtrarCampo:undefined, filtrarValor:undefined}, rango = {ini:0, cantidad:100}, ordenarpor = 'precio', forma = 'asc') =>{

    let cont = 0;
    // Hacemos copia del array de objetos original.
    let arrProductosLocal = [...arrProductos];
    console.log(`Array de productos original: `);
    console.log(arrProductosLocal);

    // Filtra el array de productos segun el  parametro  @filtro      
    arrProductosLocal = filtrarPor(arrProductosLocal,filtro);
       
    // Ordena el array segun parametro: ordenarpor
    ordenarPor(arrProductosLocal,ordenarpor);

    // Recorta el array segun el parametro @rango  (se puede utilizar para paginacion)
    arrProductosLocal = arrProductosLocal.slice(parseInt(rango.ini),parseInt(rango.cantidad));
    console.log(`Array de productos despues de filtrar y ordenar: `);
    console.log(arrProductosLocal);
    
    // renderiza la card de producto segun el array y en la posicion del parametro @idSeccion
    renderizaCardProducto(idSeccion,arrProductosLocal);

   }
    

    