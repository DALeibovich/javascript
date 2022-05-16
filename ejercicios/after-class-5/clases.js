export class Pokemon{
    constructor(nombre, tipo, vidas){
        this.nombre = nombre;
        this.tipo = tipo;
        this.vidas = vidas;
        
    }

    recibirAtaque(daño){
        this.vidas -= daño;
        if(this.vidas <= 0){
            console.log('El pokemon ${this.nombre} ha sido derrotado');
        }else{
            console.log('El pokemon ${this.nombre}  sigue vivo');
        }

    }

}

export class Picachu extends Pokemon {
    constructor(nombre, tipo, vidas,dañoImpactotrueno){
        super(nombre, tipo, vidas);
        this.dañoImpactotrueno = dañoImpactotrueno;

    }
}

export class Charmander extends Pokemon {
    constructor(nombre, tipo, vidas,dañoFuego){
        super(nombre, tipo, vidas);
        this.dañoFuego = dañoFuego;

    }
}

//export default Pokemon;