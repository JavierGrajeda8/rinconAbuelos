import { Sucursal } from './Sucursal';
import { Usuario } from './Usuario';
import { VentaDetalle } from './VentaDetalle';

export interface Venta {
    idVenta: number;
    idUsuario: number;
    idSucursal: number;
    fechaHora: number;
    cliente: string;
    nit: string;
    direccion: string;
    total: number;
    correo: string;
    serieFactura: string;
    numeroFactura: string;
    fechaFactura: number;
    descripcion?: string;
    estado: number;
    ventaDetalle?: VentaDetalle[];
    usuario?: Usuario;
    sucursal?: Sucursal;
}
