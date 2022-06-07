export const notificaciones = (texto = 'Bienvenido', color = 'green', funcionClick = '') => {

  Toastify({
    text: texto,
    duration: 2500,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: `${color}`,
    },
    onClick: funcionClick // Callback after click
  }).showToast();
}

export const habilitaBotones = (idSelector, estado) => {

  let btn = document.querySelector(`#${idSelector}`);
  btn.classList.add((estado === false) ? 'btonDesabilitar' : 'btonHabilitar');
  btn.style.pointerEvents = (estado === true) ? '' : 'none';
  btn.enabled = (estado === true) ? '' : 'none';
}

