export const renderizaCardProducto = (idSeccion, arr) => {

   if(idSeccion === 'productosHome') renderizaCardProductoHome(idSeccion, arr);
   if(idSeccion === 'productosCarrito') renderizaCardProductoCarrito(idSeccion, arr);
   if(idSeccion === 'productosRelacionado') renderizaCardProductoRelacionado(idSeccion, arr);
}

const renderizaCardProductoHome = (idSeccion, arr) => {
   
    let contenido = "";
    for (let producto of arr) {     
          
          contenido +=
             `<div class="col-sm-6 col-md-4 col-lg-4">
             <div class="box">
                <div class="option_container">
                   <div class="options">
                      <a href="" class="option1">
                      Agregar al carro
                      </a>
                      <a href="" class="option2">
                      Agregar a favorito
                      </a>
                   </div>
                </div>
                <div class="img-box">
                   <img src="images/${producto.imagen} " alt="${producto.nombre}">
                </div>
                <div class="detail-box" >
                 
                <p align="left">${producto.marca}  <br>
                   <b>${producto.nombre}</b>
                   </p> 
                  
                   <h6>
                      $${producto.precio}
                   </h6>
                </div>
             </div>
          </div>
            `;
       
 
    };

  
    document.getElementById(idSeccion).innerHTML = contenido;
 }

 const renderizaCardProductoCarrito = (idSeccion, arr) => {
   let contenido = "";
   for (let producto of arr) {     
         
         contenido +=
            `<div class="col-sm-6 col-md-4 col-lg-4">
            <div class="box">
               <div class="option_container">
                  <div class="options">
                     <a href="" class="option1">
                     Agregar al carro
                     </a>
                     <a href="" class="option2">
                     Agregar a favorito
                     </a>
                  </div>
               </div>
               <div class="img-box">
                  <img src="images/${producto.imagen} " alt="${producto.nombre}">
               </div>
               <div class="detail-box" >
                
               <p align="left">${producto.marca}  <br>
                  <b>${producto.nombre}</b>
                  </p> 
                 
                  <h6>
                     $${producto.precio}
                  </h6>
               </div>
            </div>
         </div>
           `;
      

   };

 
   document.getElementById(idSeccion).innerHTML = contenido;

 }




 
 const renderizaCardProductoRelacionado = (idSeccion, arr) => {
   let contenido = "";
   for (let producto of arr) {     
         
         contenido +=`
            
           `;
      

   };

 
   document.getElementById(idSeccion).innerHTML = contenido;

 }