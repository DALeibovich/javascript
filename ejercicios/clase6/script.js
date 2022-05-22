const personas1 = [
    {nombre: 'Lucas', edad: 42},
    {nombre: 'Juan', edad: 20}
];
Object.freeze(personas1[0]);
const personas2 = [
    {nombre: 'aaa', edad: 42},
    {nombre: 'bbb', edad: 20}
];
//const personas3 = personas1;
//const personas3 = personas1.slice();
//let personas3 = personas1.concat();
//const personas3 = Object.assign(personas1);
let personas3 = clone( personas1 ) ;

function clone( obj ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
 
    return temp;
}
//const personas3 = personas1.slice(0)
personas3[0].nombre = "Cholo";
//personas3.reverse();

console.log(personas1);
console.log(personas2);
console.log(personas3);