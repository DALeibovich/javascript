import { carrito } from "../Carrito.js";
import { favorito } from '../Favorito.js';

export const renderizaCardProducto = (idSeccion, arr) => {
   document.getElementById(idSeccion).innerHTML = "";
   if (idSeccion === 'productosHome') renderizaCardProductoHome(idSeccion, arr);
   if (idSeccion === 'productosCarrito') renderizaCardProductoCarrito(idSeccion, arr);
   if (idSeccion === 'productosFavorito') renderizaCardProductoFavorito(idSeccion, arr);
   if (idSeccion === 'resultadoBuscador') renderizaCardProductoBuscador(idSeccion, arr);

}

const formatoMoneda = (n, d = 0) => {
   n = new Intl.NumberFormat("es-AR").format(parseFloat(n).toFixed(d))
   if (d > 0) {
      const decimals = n.indexOf(",") > -1 ? n.length - 1 - n.indexOf(",") : 0;
      n = (decimals == 0) ? n + "," + "0".repeat(d) : n + "0".repeat(d - decimals);
   }
   return n;
}

const renderizaSelectTalle = (arrTalle, sku, sel = '-') => {
   let contenido = `<select id="selTalleHome_${sku}" class="option form-control">
   <option value="-" >Seleccione talle</option>`;
   // let arr = arrTalle.split(',');
   for (let indice of arrTalle) {
      let unidades = carrito.verificaStock(sku, indice.talle, 0);
      if (unidades > 0) {
         contenido += `<option ${(indice.talle === sel) ? 'selected' : ''} value="${indice.talle}">${indice.talle} (${unidades}u. disponibles)</option>
      `;
      } else {
         contenido += `<option disabled="disabled" value="${indice.talle}">${indice.talle} (sin stock)</option>
      `;
      }
   };
   contenido += "</select>";

   //console.log((arrTalle));
   return contenido;
}
const renderizaCardProductoHome = (idSeccion, arr) => {

   let contenido = "";
   arr.forEach((producto) => {
      let selectorTalle = renderizaSelectTalle(producto.stock, producto.sku);
      contenido +=
         `<div class="col-sm-6 col-md-4 col-lg-4">
         <div class="box">
            <div class="option_container">
               <div class="options">
               <div id="DIVselectorTalle_${producto.sku}">
               ${selectorTalle}
               </div>
               <a href="#" class="option1 btnAddCarHome" style="pointer-events:none"  id="btnAddCarHome_${producto.sku}">
               Agregar al carro
               </a>
               <a href="#" name="btnAddFavHome" class="option2 btnAddFavHome" id="btnAddFavHome_${producto.sku}">
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
                  $${formatoMoneda(producto.precio)}
               </h6>
            </div>
         </div>
      </div>
        `;




   });


   document.getElementById(idSeccion).innerHTML = contenido;

   arr.forEach((producto) => {
      //  console.log(`btnAddFavHome_${producto.sku}`);
      document.getElementById(`btnAddFavHome_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();
         favorito.agregarFavorito(`${producto.sku}`);
         animacionFavorito();
      });

      document.getElementById(`btnAddCarHome_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();
         let talle = document.getElementById(`selTalleHome_${producto.sku}`);
         let selectorTalle = document.getElementById(`DIVselectorTalle_${producto.sku}`);

         if (talle.value != '-') {

            carrito.agregarProductoCarrito(`${producto.sku}`, talle.value);
            selectorTalle.innerHTML = renderizaSelectTalle(producto.stock, producto.sku, talle.value);
            animacionCarrito();
         }
      });

      let selectorTalle = document.getElementById(`selTalleHome_${producto.sku}`);
      selectorTalle.addEventListener('change', () => {
         let activaBoton = document.getElementById(`btnAddCarHome_${producto.sku}`)
         activaBoton.style.pointerEvents = "none";
         if (selectorTalle.value != '-') {
            activaBoton.style.pointerEvents = "";
         }

      });

      // document.getElementById(`btnAddCarHome_${producto.sku}`).addEventListener('click', agregarProductoCarrito(`${producto.sku}`))
   })


}

const renderizaCardProductoCarrito = (idSeccion, arr) => {
   let contenido = "";
   let cont = 0;
   for (let producto of arr) {
      cont++;
      contenido +=
         `<div class="col-sm-6 col-md-4 col-lg-12" id="producto_${producto.sku}" style="display: -webkit-inline-box;">
           
          
               <div class="col-md-1">
                  <img src="images/${producto.imagen} " alt="${producto.nombre}" style="height:60px" >
               </div>
               <div class="col-md-5">
                
               <p align="left"> 
                  <b>${producto.nombre}</b><br>${producto.marca} 
                  </p> 
                  </div>
                  <div class="col-md-2" style="font-size:13px">
                  Talle: <b><font id="talleProducto_${producto.sku}">${producto.talleElegido}</font></b>
         
                  </div>
                  <div class="col-md-1" style="font-size:13px">
                   ${producto.cantidad} u.
         
                  </div>
                  <div class="col-md-2">
                
                     $${formatoMoneda(producto.precio * producto.cantidad, 2)}
                     </div>
                     <div class="col-md-1">
                     <a href="#" id="btnCarritoQuitar_${producto.sku}_${producto.talleElegido}"><i class="fa fa-trash-o"></i></a>
                          
                          </div>
                
               </div>
            
         </div><hr>
           `;


   };
   contenido += "";

   document.getElementById(idSeccion).innerHTML = contenido;

   arr.forEach((producto) => {
      //  console.log(`btnAddFavHome_${producto.sku}`);
      document.getElementById(`btnCarritoQuitar_${producto.sku}_${producto.talleElegido}`).addEventListener('click', (e) => {
         e.preventDefault();
         carrito.quitarProductoCarrito(`${producto.sku}`, producto.talleElegido);

         //animacionFavorito();      
      });
   });
   if (cont === 0) document.getElementById(idSeccion).innerHTML = 'Carrito vacio';
}





const renderizaCardProductoFavorito = (idSeccion, arr) => {
   let cont = 0;
   let contenido = "";
   for (let producto of arr) {
      cont++;
      contenido +=
         `<div class="col-sm-12 col-md-4 col-lg-12" id="producto_${producto.sku}" style="display: -webkit-inline-box;">
           
          
               <div class="col-md-2">
                  <img src="images/${producto.imagen} " alt="${producto.nombre}" style="height:60px" >
               </div>
               <div class="col-md-5">
                
               <p align="left"> 
               
                  <b>${producto.nombre}</b><br>
                  <em>${producto.marca}</em> | 
                  $${formatoMoneda(producto.precio)}
                  </p> 
                  </div>
                  <div class="col-md-3" style="font-size:13px">
                  
         
                  </div>
                  <div class="col-md-2">
                <a href="#" id="btnFavoritoQuitar_${producto.sku}"><i class="fa fa-trash-o"></i></a>
                     
                     </div>
                    
                
               </div>
            
         </div><hr>
           `;


   };
   contenido += "";

   document.getElementById(idSeccion).innerHTML = contenido;


   arr.forEach((producto) => {
      //  console.log(`btnAddFavHome_${producto.sku}`);
      document.getElementById(`btnFavoritoQuitar_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();
         favorito.quitarFavorito(`${producto.sku}`);

         //animacionFavorito();      
      });
   });

   if (cont === 0) document.getElementById(idSeccion).innerHTML = 'Favoritos vacio';
}



const renderizaCardProductoBuscador = (idSeccion, arr) => {
   let cont = 0;
   let contenido = "";
   for (let producto of arr) {
      cont++;
      contenido +=
         `<div class="col-sm-12 col-md-12 col-lg-12" id="producto_${producto.sku}" style="overflow-x:none;">
           
          
               <div class="col-md-2">
                  <img src="images/${producto.imagen} " alt="${producto.nombre}" style="height:60px" >
               </div>
               <div class="col-md-10">
                
               <p align="left"> 
               
                  <b>${producto.nombre}</b><br>
                  <em>${producto.marca}</em> | 
                  $${formatoMoneda(producto.precio)}
                  </p> 
                  </div>
                  <div class="col-md-3" style="font-size:13px">
                  
         
                  </div>
              
                    
                
               </div>
            
         </div><hr>
           `;


   };
   contenido += "";

   document.getElementById(idSeccion).innerHTML = contenido;
   if (cont === 0) document.getElementById(idSeccion).innerHTML = 'No hay resultados';


}

const btnFavorito = document.getElementById(`btnFavorito`);
const animacionFavorito = () => {
   btnFavorito.style.backgroundColor = "#ff0000";
   btnFavorito.style.color = "#fff";

}
const btnCarrito = document.getElementById(`btnCarrito`);
const animacionCarrito = () => {

   btnCarrito.style.backgroundColor = "#f0f0f0";

}