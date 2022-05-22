import {generarBanners} from './Clases/Banner.js';
// generarBanners(posicionPagina: string, cantidad: number, ordenarpor: string, forma: string): void
generarBanners('Home-top',4);
generarBanners('Home-medio',4,'nombre','descendente');
generarBanners('Home-pie',6,'id','ascendente');