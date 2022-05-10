const PI = 3.262834;
function dividirNumero(){
    let resultado = 0;
    let divisor = parseInt(prompt("ingrese el divisor"));
    let dividendo =  parseInt(prompt("ingrese el dividendo"));

    resultado =  parseFloat(divisor/dividendo);
    //console.log(resultado);
    //console.log(resultado*PI);

    var res = document.getElementById('resultado');
    var res_pi = document.getElementById('resultado_pi');
    res.innerHTML = parseFloat(resultado);
    res_pi.innerHTML = parseFloat(resultado*PI);
    alert(`el resultado es: ${parseFloat(resultado)} y si multiplicamos por el numero Pi es: ${parseFloat(resultado * PI)}`);
}