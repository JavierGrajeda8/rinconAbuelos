import { GastoDetalle } from './GastoDetalle';
import { Sucursal } from './Sucursal';
import { Usuario } from './Usuario';

export interface Gasto {
    idGasto: number;
    idUsuario: string;
    idSucursal: number;
    serieFactura: string;
    numeroFactura: string;
    fechaFactura: number;
    proveedor: string;
    fechaHora: number;
    estado: number;
    usuario?: Usuario;
    sucursal?: Sucursal;
    detalle?:  GastoDetalle[];
}
