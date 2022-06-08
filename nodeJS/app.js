let listaDatos = ['david', 'carlos', 'juan'];
function mostrarLista(lista = []) {
    if (lista.length > 0) {
        lista.forEach(element => {
            console.log(element)
        });
    }else{
        console.log('lista vacia')
    }
}

mostrarLista(listaDatos);

((...lista)=>{
    if (lista.length > 0) {
        lista.forEach(element => {
            console.log(element)
        });
    }else{
        console.log('lista vacia')
    }
})(1,2,3)

/*
(function (...args) {
  if (args.length > 0) {
    args.forEach((el) => console.log(el));
  } else {
    console.log("Lista Vacia");
  }
})(1,2,3);


function crearMultiplicador(num) {
  return function (...args) {
    args.forEach((el) => console.log(num * el));
  };
}

const duplica = crearMultiplicador(2);
const triplica = crearMultiplicador(3);

duplica(1, 2, 2, 2, 3);
triplica(10, 10, 20);

*/
//CALLBACKS
const operacion = (a,b,op,callback) => {

return op(a,b)
}

const suma = (a,b) =>{
  return a+b;
}
const resta = (a,b) =>{
  return a-b;
}
const multiplicar = (a,b) =>{
  return a*b;
}
const division = (a,b) =>{
  return a/b;
}
const modulo = (a,b) =>{
  return a%b;
}

console.log(operacion(4,5,suma, () => {
  console.log ('suma')
}))
console.log(operacion(4,5,resta))
console.log(operacion(4,5,division))
console.log(operacion(4,5,multiplicar))
console.log(operacion(4,5,modulo))


//PROMESAS
/*
Promise.resolve(20)
.then(x =>x+1)
.then(x => x+3)
*/