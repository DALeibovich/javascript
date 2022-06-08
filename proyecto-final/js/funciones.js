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

export const formatoMoneda = (n, d = 0) => {
  n = new Intl.NumberFormat("es-AR").format(parseFloat(n).toFixed(d))
  if (d > 0) {
     const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;
     n = (decimals == 0) ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
  }
  return n;
}


