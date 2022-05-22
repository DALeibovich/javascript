
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

    const productoFiltrarMarca = (marca) => {

    }

    const productoFiltrarCategoria = (categoria) => {

    }

    const productoOrdenarPrecio = (precio,orden) => {
        
    }

    const productoBuscar = (texto) => {

    }

    const producto1 = new Producto (1,'polo01','Camisas','Camisa dos Caballos','p08.png',10500,'Camisa de seda con logo de 2 caballos',{s:5,M:5,L:4,XL:2},'Polo');
    const producto2 = new Producto (2,'laco02','Camisas','Camisa Yacare','p09.png',12500,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto3 = new Producto (3,'polo03','Vestidos','Vestido corto Potrillo','p4.png',12500,'Vestidos de Lino eslastizado',{s:1,M:1,L:0,XL:2},'Polo');
    const producto4 = new Producto (4,'laco04','Vestidos','Vestido largo Cocodrilo','p5.png',12500,'Vestidos de Lino con guardas de tul',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto5 = new Producto (5,'laco90','Camisas','Camisa Lagartija','p2.png',11400,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    const producto6 = new Producto (6,'laco02','Camisas','Camisa Chelco','p10.png',9800,'Camisa manga cortas de lino',{s:1,M:1,L:0,XL:2},'Lacoste');
    const productos = [producto1,producto2,producto3,producto4,producto5,producto6];
    
    export default productos;
/*
    class Persona {
        constructor(nombre, apellido, edad, sueldo) {
            this.nombre = nombre
            this.apellido = apellido
            this.edad = edad
            this.sueldo = sueldo
        }
    }
    
    const persona1 = new Persona("Francisco", "Pugh", 30, 10000)
    const persona2 = new Persona("Gonzalo", "Ledesma", 20, 11000)
    const persona3 = new Persona("Alfredo", "Jesus", 20, 12000)
    const persona4 = new Persona("Maria", "Mariales", 32, 13000)
    const persona5 = new Persona("Agustina", "Agus", 23, 10000)
    const persona6 = new Persona("Camila", "Camilez", 26, 7000)
    
    const personas = [persona1, persona2, persona3, persona4, persona5, persona6]
    
    export default personas
    */