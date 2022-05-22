export const renderizaCardProducto = (idSeccion, arr, cantidad) => {
    let cont = 0;
    let contenido = "";
    for (let producto of arr) {
 
       if (cont++ < cantidad) {
          if (cont > 1) activo = "";
          contenido +=
             `<div class="col-sm-6 col-md-4 col-lg-4">
             <div class="box">
                <div class="option_container">
                   <div class="options">
                      <a href="" class="option1">
                      Agregar al carro
                      </a>
                      
                   </div>
                </div>
                <div class="img-box">
                   <img src="images/${producto.imagen} " alt="${producto.nombre}">
                </div>
                <div class="detail-box">
                   <h5>
                   ${producto.nombre} | ${producto.marca} 
                   </h5>
                   <h6>
                      $${producto.precio}
                   </h6>
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