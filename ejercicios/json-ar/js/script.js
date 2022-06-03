
class Api{

  constructor(api, url){
    this.api = api;
    this.url = url;
  }

}

let apisObject = new Api();
const postTix = (texto = 'Bienvenido', color = 'green', funcionClick = '') => {

  Toastify({
    text: texto,
    duration: -1,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      position: "relative!important",
      background: `${color}`,
      height: '100px',
      width: '80%',
      color: "#fff",
      overflow: "auto",
    },
   // Click: funcionClick // Callback after click
  }).showToast();
}

function postixClicks(url) {
window.open(url, '_blank');
}


apisObject = JSON.parse(localStorage.getItem('api')) || []; 

console.log(apisObject);
apisObject.forEach( (Api) =>{
  //postTix(`${Api.nombre} \n  ${Api.url}`);
  postTix(`Nombre: ${Api.nombre} - url: ${Api.url}`,'green');
})

function agregaApiStorages(nombre, url){
  apisObject.push({nombre: nombre, url: url});
  localStorage.setItem('api', JSON.stringify(apisObject));
  postTix(`${nombre} \n ${url}`,'green');
}

let btn = document.getElementById('btnSubmit');
btn.addEventListener('click',(e) =>{
  e.preventDefault();
  agregaApiStorages('Api clientes','https://json.ar/api/dsfasdfasdfasdfasdfasdfsadfsadfasdfsa')
});

let response = "";



async function getResponse(){
  
fetch("https://json.ar/apis/archivos/5d6d2a2e273bd3cae79ba9d3f91a0a84.json")
.then(response => response.json())
.then(data => console.log(data))
    
} 



console.log( getResponse());
 