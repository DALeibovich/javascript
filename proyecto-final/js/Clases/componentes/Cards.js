
export const renderizaCard = (idSeccion, arr, cantidad) => {
    let cont = 0;
   
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


