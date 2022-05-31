let btnEnviar = document.getElementById('btnEnviarMensaje');
let mensaje = document.getElementById('mensaje');
let prioridad = document.getElementById('prioridad');
btnEnviar.addEventListener('click', () => {
  postTix(mensaje.value, prioridad.value);
  mensaje.value = "";
  prioridad.value = "blue";
});



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
      width: '250px',
      color: "#fff",
      overflow: "auto",

    },
    onClick: funcionClick // Callback after click
  }).showToast();
}