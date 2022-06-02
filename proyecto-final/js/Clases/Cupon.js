
    class Cupon {

        constructor(id, codigo, beneficio) {
            this.id = id;
            this.codigo = codigo;
            this.beneficio = beneficio;
            if(this.beneficio<=1) this.tipo = '%'; else this.tipo = '$';       
        
        }
           
    
    }
    const cupon1 = new Cupon (1,'HOUSE10',0.1);
    const cupon2 = new Cupon (2,'HOUSE15',0.15);
    const cupon3 = new Cupon (3,'HOUSE30',0.3);
    const cupon4 = new Cupon (4,'HOUSE500',500);
    const cupon5 = new Cupon (5,'HOUSE800',800);
    const cupones = [cupon1,cupon2,cupon3,cupon4,cupon5];
    

    const consultarCuponDisponible = (cupon) => {
        let cupones;
        let ret = "Cupon no valido";
        
        for(cupones of DB_CUPONES){
            if(cupones.codigo === cupon.toUpperCase()){
                if(parseInt(cupones.beneficio)<1){
                    ret = `El cupon tiene un descuento de ${parseFloat(cupones.beneficio) * 100}% `;
                }else{
                    ret = `El cupon tiene un descuento de $${cupones.beneficio} `
                }
                
            } 
        };
        return alert(ret);
    }
    
    
    const verificaExistenciaCupon = (cupon) => {    
        let existeCupon = false  
        let cupones;   
        for(cupones of DB_CUPONES){
            if(cupones.codigo === cupon){
                existeCupon = true;
            }
        };
        return existeCupon;
    }
    
    
    
    const agregarCupon = () => {
        let codigoCupon = "";
        let valorCupon = 0;
        let salir;
       
        do{
            salir = 1;
            codigoCupon = (prompt("Ingrese el codigo de cupon")).toUpperCase();
            valorCupon = parseFloat(prompt("Ingrese un valor de 0 a 1 para descuento por % o un valor entero para descuento por dinero"));
           
            if(verificaExistenciaCupon(codigoCupon) === true){
                alert("El codigo de cupon asignado ya existe");
                salir = 0; 
            }
            if(isNaN(valorCupon) || valorCupon <=0) {
                alert("El valor del cupon deben ser numericos positivos.");    
                salir = 0;      
            }
           
                 
        }while(salir == 0 );
      
        DB_CUPONES.push({codigo: codigoCupon, beneficio:valorCupon});
    
        console.log(DB_CUPONES);
        alert('agregado con exito');
    }
    
    const eliminarCupon = (cupon) =>{
        let ret = "No existe el cupon a eliminar";
        let indice;
        if(verificaExistenciaCupon(cupon) === true){
            for(let cupones of DB_CUPONES){
                if(cupones.codigo === cupon.toUpperCase()){
                    indice = DB_CUPONES.indexOf(cupones);
                    DB_CUPONES.splice(indice,1);       
                    ret = "eliminado con exito";
                }           
                
            }
        }
        console.log(indice);
        console.log(DB_CUPONES);
        alert(ret);
    }
    export default cupones;