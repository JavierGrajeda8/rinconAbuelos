import { Producto } from './Producto';
import { Venta } from './Venta';

export interface VentaDetalle {
    idVentaDetalle: number;
    idVenta: number;
    idProducto: number;
    cantidad: number;
    precioVenta: number;
    costo: number;
    descuento: number;
    fechaHora: number;
    estado: number;
    venta?: Venta;
    producto?: Producto;
}
