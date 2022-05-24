class Financiacion {

    constructor(id,tipo,marcaTarjeta, bancoEmisor, cuotas){

        this.id = id;
        this.tipo = tipo;
        this.marcaTarjeta = marcaTarjeta;
        this.bancoEmisor = bancoEmisor;
        this.cuotas = cuotas;
    }
}

const tarjeta1 = new Financiacion (1,'credito', 'Visa','Banco Macro',{"1":0, "3":0, "6":0.15,"12":0.3});
const tarjeta2 = new Financiacion (1,'credito', 'Mastercard','Banco Macro',{"1":0, "3":0.25});
const tarjeta3 = new Financiacion (1,'debito', 'Visa','Banco Macro',{"1":0});
const tarjeta4 = new Financiacion (1,'credito', 'Visa','Banco Santander',{"1":0, "6":0, "12":0});
const tarjeta5 = new Financiacion (1,'credito', 'Mastercard','Banco Santander',{"1":0, "3":0.25});

export const tarjeta = [tarjeta1, tarjeta2, tarjeta3, tarjeta4, tarjeta5];
