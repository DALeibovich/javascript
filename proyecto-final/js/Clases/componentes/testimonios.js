
export const renderizaTestimonio = (idSeccion, arr, cantidad) => {
   let cont = 0;
   let activo = "active";
   let contenido =
      `<div id="carousel${idSeccion}" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;

   for (let testimonio of arr) {
      if (cont++ < cantidad) {
         if (cont > 1) activo = "";
         contenido +=
            `<div class="carousel-item ${activo}">
                   <div class="box col-lg-10 mx-auto">
                      <div class="img_container">
                         <div class="img-box">
                            <div class="img_box-inner">
                               <img src="images/${testimonio.foto}" alt="">
                            </div>
                         </div>
                      </div>
                      <div class="detail-box">
                         <h5>
                         ${testimonio.nombre}
                         </h5>
                         <h6>
                         ${testimonio.cargo}
                         </h6>
                         <p>
                         ${testimonio.comentario}
                         </p>
                      </div>
                   </div>
                </div>

                
            `;
      }

   };

   contenido += ` </div>
    <div class="carousel_btn_box">
       <a class="carousel-control-prev" href="#carousel${idSeccion}" role="button" data-slide="prev">
       <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
       <span class="sr-only">Previous</span>
       </a>
       <a class="carousel-control-next" href="#carousel${idSeccion}" role="button" data-slide="next">
       <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
       <span class="sr-only">Next</span>
       </a>
    </div>
 </div>`;
   document.getElementById(idSeccion).innerHTML = contenido;
}