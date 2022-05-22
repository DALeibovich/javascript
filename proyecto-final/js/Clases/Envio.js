
    class Envio {

        constructor(id, cp, localidad, costoenvio) {
            this.id = id;
            this.cp = cp;
            this.localidad = localidad;
            this.costoenvio = costoenvio;           
        
        }
           
        envioGratis = (importe) => {
            let ret =false;
            if(importe >= ENVIOGRATIS){
                ret = true;
            }
            return ret;
        }
    
    }
    const envio1 = new Envio (1,'x5000','Cordoba Capital',1200);
    const envio2 = new Envio (2,'y6000','Santa Fe',1100);
    const envio3 = new Envio (2,'z7000','San Luis',1000);
    export const envios = [envio1,envio2,envio3];
    export const ENVIOGRATIS = 6000; //importe minimo del envio gratis
    