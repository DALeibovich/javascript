
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
    
    export default cupones;