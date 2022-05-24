export const renderizaBanners = (posicionPagina, arr, cantidad) => {
   if (posicionPagina == 'Banner_Home-top') renderizaBannerHomeTop(posicionPagina, arr, cantidad);
   if (posicionPagina == 'Banner_Home-medio') renderizaBannerHomeMedio(posicionPagina, arr, cantidad);
}


const renderizaBannerHomeTop = (posicionPagina, arr, cantidad) => {
   let controles = "";
   let cont = 0;
   let activo = 'active';

   let contenido = `
   <div class="slider_bg_box">
   <img src="images/slider-bg.jpg" alt="">
</div>
<div id="customCarousel1" class="carousel slide" data-ride="carousel">
   <div class="carousel-inner">`;

   for (let banner of arr) {
      console.log("Banner: " + banner.titulo);
      if (cont++ < cantidad) {
         if (cont > 1) activo = "";
         controles +=  ` <li data-target="#customCarousel1" data-slide-to="${cont-1}" class="${activo}"></li>`;
         contenido += `
         <div class="carousel-item ${activo}">
                          <div class="container ">
                             <div class="row">
                                <div class="col-md-7 col-lg-6 ">
                                   <div class="detail-box">
                                      <h1>
                                        ${banner.titulo}
                                      </h1>
                                      <p>
                                      ${banner.bajada}
                                      </p>
                                      <div class="btn-box">
                                         <a href="${banner.linkDestino}" class="btn1">
                                         ${banner.nombreBoton}
                                         </a>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>`;
      }
   };
   contenido += `</div>
   <div class="container">
      <ol class="carousel-indicators">
         ${controles}
      </ol>
   </div>
</div>
   `;
   //console.log(controles);
   document.getElementById(posicionPagina).innerHTML = contenido;

}


const renderizaBannerHomeMedio = (posicionPagina, arr, cantidad) => {
   let cont = 0;
   let contenido = "";
   let activo = 'active';
   for (let banner of arr) {

      if (cont++ < cantidad) {
         if (cont > 1) activo = "";
         contenido +=
            `<div class="container">
  <div class="box">
     <div class="arrival_bg_box">
        <img src="images/arrival-bg.png" alt="">
     </div>
     <div class="row">
        <div class="col-md-6 ml-auto">
           <div class="heading_container remove_line_bt">
              <h2>
              ${banner.titulo}
              </h2>
           </div>
           <p style="margin-top: 20px;margin-bottom: 30px;">
           ${banner.bajada}
           </p>
           <a href="${banner.linkDestino}" class="btn1" >
           ${banner.nombreBoton}
           </a>
        </div>
     </div>
  </div>
</div>`;
      }

   };
   document.getElementById(posicionPagina).innerHTML = contenido;
}


