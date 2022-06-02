export const  notificaciones = (texto='Bienvenido',color='green',  funcionClick='') => {
 
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
