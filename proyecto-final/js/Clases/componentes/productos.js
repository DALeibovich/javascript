import { carrito } from "../Carrito.js";
import { favorito } from '../Favorito.js';
import { consultarCuponDisponible, cuponSeleccionado, quitarCupon } from '../Cupon.js';
import { calculaCostoEnvio, cpEnvioSeleccionado, quitarEnvio, ENVIOGRATIS } from '../Envio.js';
import { arrProductos, generarProductosCarrito, importeBTC } from '../Producto.js';
import { notificaciones, formatoMoneda } from '../../funciones.js';



// funcion para renderizar de productos en la seccion deseada poniendo un loading de espera 
export const renderizaCardProducto = (idSeccion, arr, loading = true) => {
   if (loading === true) {
      document.getElementById(idSeccion).innerHTML = `
   <div style="height:200px; margin-top:50px " align="center">
   <i class="fa fa-spinner fa-spin" style="font-size:80px" id="productosHome_${idSeccion}"></i>
   </div>
   `;
   }

   const interval_0 = setInterval(() => {

      if (arrProductos[0].sku.length > 0) clearInterval(interval_0);

      if (idSeccion === 'productosHome') renderizaCardProductoHome(idSeccion, arr);
      if (idSeccion === 'productosCarrito') renderizaCardProductoCarrito(idSeccion, arr);
      if (idSeccion === 'productosFavorito') renderizaCardProductoFavorito(idSeccion, arr);
      if (idSeccion === 'resultadoBuscador') renderizaCardProductoBuscador(idSeccion, arr);
      if (idSeccion === 'seccion_lacoste' || idSeccion === 'seccion_vestidos') renderizaCardProductoDefault(idSeccion, arr);



   }, 500)

}


const renderizaSelectTalle = (arrTalle, sku, sel = '-') => {

   let contenido = `<select id="selTalleHome_${sku}" class="option form-control">
   <option value="-" >Seleccione talle</option>`;
   ;
   for (let indice of arrTalle) {
      let unidades = carrito.verificaStock(sku, indice.talle, 0);
      // Optimizacion con uso del operador ternario
      contenido += (unidades > 0) ?
         `<option ${(indice.talle === sel) ? 'selected' : ''} value="${indice.talle}">${indice.talle} (${unidades}u. disponibles)</option>`
         :
         `<option disabled="disabled" value="${indice.talle}">${indice.talle} (sin stock)</option>`;
   };
   contenido += "</select>";

   return contenido;
}

const renderizaBotonFavorito = (sku, estado = '') => {
   let arrFav = favorito.arrFavorito;

   // Optimizacion con uso del operador ternario
   let claseBoton = (arrFav.find(arrFav => arrFav === sku)) ? 'claseBotonQuitar' : 'claseBotonAgregar';
   let contenido = `<a href="#" name="btnAddFavHome" class="option2 btnAddFavHome ${claseBoton} ${claseBoton}_${sku}" id="btnAddFavHome_${sku}">
   <i class="fa fa-heart" > </i> Favorito
</a>`;
   return contenido;

}


const renderizaCardProductoHome = (idSeccion, arr) => {

   let contenido = ``;

   arr.forEach((producto) => {


      let selectorTalle = renderizaSelectTalle(producto.stock, producto.sku);

      contenido +=
         `
         <div class="col-sm-6 col-md-4 col-lg-4">
         <div class="box">
            <div class="option_container" id="option_container_${producto.sku}">
               <div class="options">
               <div id="DIVselectorTalle_${producto.sku}">
               ${selectorTalle}
               </div>
               <a href="#" class="option1 btnAddCarHome" style="pointer-events:none"  id="btnAddCarHome_${producto.sku}">
               Agregar al carro
               </a>
                <div id="DIVbtnAddFavHome_${producto.sku}">${renderizaBotonFavorito(producto.sku)}</div>
               
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
                  $${formatoMoneda(producto.precio)}<br>
                  <font id="precio_btc_${producto.sku}" class="precio_usd">BTC:${(producto.precioBitcoin)}</font>
               </h6>
            </div>
         </div>
      </div>
      
        `;




   });


   document.getElementById(idSeccion).innerHTML = contenido;

   let arrFav = favorito.arrFavorito;

   arr.forEach((producto) => {

      let selectorFavorito = document.getElementById(`btnAddFavHome_${producto.sku}`);



      document.getElementById(`btnAddFavHome_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();

         let favoritoBorrar = selectorFavorito.classList.contains(`claseBotonAgregar_${producto.sku}`) ?? 0;

         if (favoritoBorrar === true) {
            selectorFavorito.classList.remove(`claseBotonAgregar_${producto.sku}`);
            selectorFavorito.classList.remove('claseBotonAgregar');
            selectorFavorito.classList.add('claseBotonQuitar');
            favorito.agregarFavorito(`${producto.sku}`);

         } else {

            selectorFavorito.classList.remove('claseBotonQuitar');
            selectorFavorito.classList.add(`claseBotonAgregar_${producto.sku}`);
            selectorFavorito.classList.add('claseBotonAgregar');
            favorito.quitarFavorito(`${producto.sku}`);
            //renderizaCardProducto('productosHome',arrProductosFiltrado);
         }

         document.getElementById('btnFavorito_total').innerHTML = favorito.cantidadProductos();

      });





      document.getElementById(`btnAddCarHome_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();
         let talle = document.getElementById(`selTalleHome_${producto.sku}`);
         let selectorTalle = document.getElementById(`DIVselectorTalle_${producto.sku}`);

         if (talle.value != '-') {

            carrito.agregarProductoCarrito(`${producto.sku}`, talle.value);
            selectorTalle.innerHTML = renderizaSelectTalle(producto.stock, producto.sku, talle.value);
            document.getElementById('btnCarrito_total').innerHTML = carrito.cantidadProductos();
         } else {
            notificaciones("Debe seleccionar un talle", 'red')
         }

      });

      let selectorTalle = document.getElementById(`selTalleHome_${producto.sku}`);
      selectorTalle.addEventListener('change', () => {

         let activaBoton = document.getElementById(`btnAddCarHome_${producto.sku}`);
         activaBoton.style.pointerEvents = "none";
         if (selectorTalle.value != '-') {
            activaBoton.style.pointerEvents = "inherit";
         }

      });

      // document.getElementById(`btnAddCarHome_${producto.sku}`).addEventListener('click', agregarProductoCarrito(`${producto.sku}`))
   })


}

const renderizaCardProductoCarrito = (idSeccion, arr) => {
   let contenido = `
   <div align="center"><em><b>Envio gratis</b> en compras mayores a <b>$${ENVIOGRATIS}</b></em></div>
   <div class="card">
   <div class="card-header" id="headingOne">
     <h5 class="mb-0">
       <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
         Detalle de compra
       </button>
     </h5>
   </div>
   <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
   `;
   let cont = 0;
   for (let producto of arr) {
      cont++;
      contenido +=
         `<div class="col-md-12" id="producto_${producto.sku}" style="display: -webkit-inline-box;">
           
          
                  <div class="col-md-1">
                  <img src="images/${producto.imagen} " alt="${producto.nombre}" style="height:60px" >
                  </div>
               

                  <div class="col-md-4">                
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
                  <div class="col-md-3" align="right" style="">
                
                     $${formatoMoneda(producto.precio * producto.cantidad, 2)}<br>
                     <font id="precio_btc_${producto.sku}_carrito" class="precio_usd">BTC:${(producto.precioBitcoin * producto.cantidad)}</font>
                   </div>
                  <div class="col-md-1" align="right" >
                        <a href="#" id="btnCarritoQuitar_${producto.sku}_${producto.talleElegido}"><i class="fa fa-trash-o"></i></a>
                          
                  </div>
                
               
            
         </div><hr>
         
           `;


   };

   if (cont === 0) {
      document.getElementById(idSeccion).innerHTML = `
      <div align="center">
   <i class="fa fa-shopping-cart fa-4x" style="color: gray"></i>
   <br>Carrito vacio</br>
   </div>
      
      `;
   } else {
      contenido += ` </div>
      </div>
    </div>
    
    
    `;

      //contenido += renderizaResumenCarrito();
      contenido += `
       <div class="col-md-12" style="display: -webkit-inline-box;">
       <div class="col-md-6" >
       ${renderizaEnvio()}
       ${renderizaCuponDescuento()}     
       
       </div>
       <div class="col-md-6" style="display: -webkit-inline-box;" id="resumenCarrito">
       ${renderizaResumenCarrito()}
      
       </div>
       </div>
       
       <div class= col-md-10" align="right" >
       
         <button type="button" class="btn btn-primary" id="finalizarCompra">Finalizar compra</button>
</div>
       `;
      // contenido += renderizaEnvio();

      document.getElementById(idSeccion).innerHTML = contenido;
      arr.forEach((producto) => {

         document.getElementById(`btnCarritoQuitar_${producto.sku}_${producto.talleElegido}`).addEventListener('click', (e) => {
            e.preventDefault();
            carrito.quitarProductoCarrito(`${producto.sku}`, producto.talleElegido);
            document.getElementById('btnCarrito_total').innerHTML = carrito.cantidadProductos();

            // actualizamos el selectorTalle despues de quitar el producto del carrito si esta visible el producto
            let selectorTalle = document.getElementById(`DIVselectorTalle_${producto.sku}`);
            if (selectorTalle !== null) {
               let activaBoton = document.getElementById(`btnAddCarHome_${producto.sku}`);
               activaBoton.style.pointerEvents = "";
               selectorTalle.innerHTML = renderizaSelectTalle(producto.stock, producto.sku, producto.talleElegido);
            }
            //animacionFavorito();      
         });
      });


      document.getElementById('BTNcarritoCuponDescuento').addEventListener('click', () => {
         let ret = consultarCuponDisponible(document.getElementById('TXTcarritoCuponDescuento').value);

         if (ret !== undefined) {
            //document.getElementById('resumenCarrito').innerHTML = renderizaResumenCarrito();
            generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);
         }
      })


      if (document.getElementById('BTNcarritoCuponDescuentoBorrar') !== null) {
         document.getElementById('BTNcarritoCuponDescuentoBorrar').addEventListener('click', () => {

            quitarCupon();
            generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);


         });




      }

      document.getElementById('BTNcarritoEnvio').addEventListener('click', () => {

         if (document.getElementById('TXTcarritoEnvio').value != '') {
            let ret = calculaCostoEnvio(carrito.importeTotal(), document.getElementById('TXTcarritoEnvio').value)

            if (ret !== undefined) {

               document.getElementById('resumenCarrito').innerHTML = renderizaResumenCarrito();
               generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);
            }
         } else {
            notificaciones('Ingrese un codigo postal', 'red')
         }
      })
      if (document.getElementById('BTNcarritoEnvioBorrar') !== null) {
         document.getElementById('BTNcarritoEnvioBorrar').addEventListener('click', () => {

            quitarEnvio();
            generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);


         });
      }


      document.getElementById('finalizarCompra').addEventListener('click', () => {
         if (cpEnvioSeleccionado.cp != undefined) {
            renderizaFinalizarCompra('productosCarrito');
         } else {
            notificaciones('Debe calcular el costo de envio primero', 'orange')
         }
      })

   }






}


const renderizaResumenCarrito = () => {
   let importeCarrito = carrito.importeTotal();
   let importeDescuento = (cuponSeleccionado.beneficio < 1) ? parseFloat(cuponSeleccionado.beneficio) * importeCarrito : parseInt(cuponSeleccionado.beneficio);
   if (isNaN(importeDescuento)) importeDescuento = 0;
   let importeEnvio = (importeCarrito > ENVIOGRATIS) ? 0 : parseFloat(cpEnvioSeleccionado.costoenvio);
   if (isNaN(importeEnvio)) importeEnvio = 0;
   let importeTotalCarrito = importeCarrito - importeDescuento + importeEnvio;
   carrito.importeApagar = importeTotalCarrito;
   carrito.importeDescuento = importeDescuento;
   carrito.importeEnvio = importeEnvio;
   let contenido =

      `  
      <div class="col-md-2" style="font-size:13px">
      </div>
                  <div class="col-md-3" >
                   <b>${carrito.cantidadProductos()} u.</b>
                   <div id="DIVdenvio" style="" >${renderizaEnvio(1)}</div> 
                  <div id="DIVdcto" style="">${renderizaCuponDescuento(1)}</div><br>
                   

                  </div>
                  <div class="col-md-5" align="right" >
                
                   $${formatoMoneda(importeCarrito, 2)} <br>
                   + $${formatoMoneda(parseFloat(importeEnvio), 2)} <br>
                  - $${formatoMoneda(parseFloat(importeDescuento), 2)} <br>
                  
                  <b>  $${formatoMoneda(importeTotalCarrito, 2)}</b> <br>
                  <font id="precio_btc_total" class="precio_usd"><b>BTC:${importeBTC(importeTotalCarrito)}</b></font>
                     </div>
                   
                
            
           `;


   return contenido;
}


const renderizaEnvio = (eliminar = 0) => {

   let contenido = "";
   if (eliminar === 0) {
      contenido =
         `<div class="col-md-12" >          
              <input  class="form-control" type="text" id="TXTcarritoEnvio" style="width:60%; float:left" class="form-control" placeholder="Código Postal....">

            <input  type="button" id="BTNcarritoEnvio" style="width:40%; float:left" class="btn btn-primary" placeholder="" value="Calcular envio">
       </div>
        `;
   } else {
      contenido = (cpEnvioSeleccionado.cp !== undefined) ? `<a href="#" id="BTNcarritoEnvioBorrar"> <i class="fa fa-trash-o" >&nbsp;${cpEnvioSeleccionado.localidad}</i></a> ` : 'Envio:';
   }
   return contenido;
   return contenido;

}

const renderizaCuponDescuento = (eliminar = 0) => {
   let contenido = "";
   if (eliminar === 0) {
      contenido =
         `<div class="col-md-12" >          
 <input  type="text" id="TXTcarritoCuponDescuento" style="width:60%; float:left" class="form-control" placeholder="Cupon HOUSE....">
<input  type="button" id="BTNcarritoCuponDescuento" style="width:40%; float:left" class="btn btn-primary" value="Aplicar">
      </div>
        `;

   } else {
      contenido = (cuponSeleccionado.beneficio !== undefined) ? `<a href="#" id="BTNcarritoCuponDescuentoBorrar"> <i class="fa fa-trash-o" >&nbsp;${cuponSeleccionado.codigo}</i></a> ` : 'Dcto:';
   }
   return contenido;


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

      document.getElementById(`btnFavoritoQuitar_${producto.sku}`).addEventListener('click', (e) => {
         e.preventDefault();
         favorito.quitarFavorito(`${producto.sku}`);
         document.getElementById('btnFavorito_total').innerHTML = favorito.cantidadProductos();

         // Actualizamos el boton favorito si la card esta visible
         let selectorFavorito = document.getElementById(`btnAddFavHome_${producto.sku}`);
         if (selectorFavorito !== null) {
            selectorFavorito.classList.remove('claseBotonQuitar');
            selectorFavorito.classList.add(`claseBotonAgregar_${producto.sku}`);
            selectorFavorito.classList.add('claseBotonAgregar');
         }

      });
   });

   if (cont === 0) document.getElementById(idSeccion).innerHTML = `
   
   <div align="center">
   <i class="fa fa-heart fa-4x" style="color: gray"></i>
   <br>Sin favoritos por aqui. </br>
   </div>

   `;
}



const renderizaCardProductoBuscador = (idSeccion, arr) => {
   let cont = 0;
   let contenido = "";
   for (let producto of arr) {
      cont++;
      contenido +=
         `<div class="col-sm-10 col-md-10 col-lg-10" id="producto_${producto.sku}" style="overflow: none; display: -webkit-inline-box;">
           
          
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


export const renderizaPrecioBitcoin = () => {

   arrProductos.forEach((producto) => {
      let btc = document.getElementById(`precio_btc_${producto.sku}`);
      if (btc !== null) {
         btc.innerHTML = producto.precioBitcoin;

      }

   })

   if (carrito.arrProductosCarrito !== undefined) {
      carrito.arrProductosCarrito.forEach((carrito) => {
         let btc = document.getElementById(`precio_btc_${carrito.sku}_carrito`);
         if (btc !== null) {
            btc.innerHTML = carrito.precioBitcoin * carrito.cantidad;

         }




      })
   }

}

const renderizaFinalizarCompra = (idSeccion) => {


   let contenido = `

<div class="col-md-12">
   <form class="row" class="form-control" id="frmComprar" role="form">
   <div class="col-md-6">
   <label for="inputNombre" class="form-label">Nombre y apellido</label>
   <input type="text" class="form-control" id="inputnombre" required >
 </div>
  <div class="col-md-6">
    <label for="inputEmail" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail">
  </div>



  <div class="col-md-6">
    <label for="inputCiudad" class="form-label">Ciudad</label>
    <input type="text" class="form-control" disabled  id="inputCiudad" value="${cpEnvioSeleccionado.localidad}">
  </div>
  
  <div class="col-md-4">
    <label for="inputCP" class="form-label">Código postal</label>
    <input disabled type="text" class="form-control" id="inputCP" value="${cpEnvioSeleccionado.cp}">
  </div>
  <div class="col-12">
  <label for="inputDireccion" class="form-label">Domicilio de envio</label>
  <input required type="text" classs="form-control" id="inputDireccion" placeholder="Calle, altura, piso, depto...">
</div>
  <div class="col-6">
    <div class="form-group" >
      <input class="form-check-input" type="radio" id="formaPago" name="formaPago" checked  value="Transferencia" >
      <label class="form-check-label" for="Transferencia">
        Transferencia | Total $${formatoMoneda(carrito.importeApagar, 2)}
      </label>
    </div>
    <div class="form-group" >
    <input class="form-check-input" type="radio" id="formaPago" name="formaPago" value="Bitcoin" >
    <label class="form-check-label" for="Transferencia">
       Cryptos | BTC: ${importeBTC(carrito.importeApagar)}
    </label>
  </div>

  </div>
  <div class="col-6" align="right"><br>
    <button type="submit" class="btn btn-primary" id="btnPagar"> Comprar y pagar</button>
  </div>
</form>
</div>

   `;
   document.getElementById(idSeccion).innerHTML = contenido;


   document.getElementById('frmComprar').addEventListener('submit', (e) => {
      e.preventDefault();
      Swal.fire({
         icon: 'question',
         title: '¿Desea confirmar esta compra?',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
      }).then((result) => {
         if (result.isConfirmed) {

            console.log()
            Swal.fire({
               icon: 'success',
               title: `Recibimos su pedido correctamente!!`,
               text: `Enviamos a su cuenta de email las instrucciones de pago. Gracias!!!`
            });
            //guardamos la compra y vaciamos los datos del carrito
            carrito.finalizarCompra();
            generarProductosCarrito('productosCarrito', carrito.arrProductosCarrito);
            document.getElementById('btnCarrito_total').innerHTML = carrito.cantidadProductos();
         }
      })
   })
   return contenido;
}


const renderizaCardProductoDefault = (idSeccion, arr) => {

   let contenido = ``;

   arr.forEach((producto) => {




      contenido +=
         `
         <div class="col-sm-6 col-md-4 col-lg-4">
         <div class="box">
            
            <div class="img-box">
               <img src="images/${producto.imagen} " alt="${producto.nombre}">
            </div>
            <div class="detail-box" >
             
            <p align="left">${producto.marca}  <br>
               <b>${producto.nombre}</b>
               </p> 
              
               <h6>
                  $${formatoMoneda(producto.precio)}<br>
                  
               </h6>
            </div>
         </div>
      </div>
      
        `;

   });

   document.getElementById(idSeccion).innerHTML = contenido;

}