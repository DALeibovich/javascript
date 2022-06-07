/* renderiza las cards */

export const renderizaCard = (idSeccion, arr, cantidad) => {
   document.getElementById(idSeccion).innerHTML = `
   <div style="height:200px; margin-top:50px " align="center">
   <i class="fa fa-spinner fa-spin" style="font-size:80px" id="productosHome_${idSeccion}"></i>
   </div>
   `
    let cont = 0;
  // console.log(arr)
    let contenido = "";
    
    for (let card of arr) { 
       if (cont++ < cantidad) {
       
          contenido +=
             `<div class="col-md-4">
             <div class="box"  style="background-color: #076389;">
                <div class="img-box">
                   <img src="images/${card.imagen}" width="70px" height="70px" >
                </div>
                <div class="detail-box">
                   <h5>
                     ${card.titulo}
                   </h5>
                   <p>
                   ${card.descripcion}
                   </p>
                </div>
             </div>
          </div>
                
            `;
       }
 
    };

   
    document.getElementById(idSeccion).innerHTML = contenido;
 }


