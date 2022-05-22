import {generarBanners} from './Clases/Banner.js';
import {generarTestimonios} from './Clases/Testimonio.js';
import {generarCards} from './Clases/Card.js';

generarBanners('Home-top',5,'orden','ascendente');
generarBanners('Home-medio',1);
generarCards('seccion_elegirnos',5);
generarTestimonios('seccion_testimonio',5);
generarCards('seccion_sucursales',5);
