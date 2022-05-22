    import {renderizaTestimonio} from './componentes/testimonios.js';
    class Testimonio {

        constructor(id, nombre, foto, cargo, comentario) {
           this.id = id;
           this.nombre = nombre;
           this.cargo = cargo;
           this.foto = foto;
           this.comentario = comentario;   
        
        }
          
    
    }

    const testimonio1 = new Testimonio (1,'Lorena', 'client.jpg','Profesora', 'Los mejores precios que he visto en internet.');
    const testimonio2 = new Testimonio (2,'Natalia', 'client.jpg','Agente inmobiliario', 'Increibles los descuentos que podes encontrar');
    const testimonio3 = new Testimonio (3,'Roxana', 'client.jpg','Vendedora', 'Compre un lunes a la mañana y a la tarde ya lo recibi!!');

    const testimonios = [testimonio1,testimonio2,testimonio3];

    export const generarTestimonios = (idSeccion, cantidad) =>{
        const arrTestimonios = [...testimonios];
        renderizaTestimonio(idSeccion,arrTestimonios,5);
    }