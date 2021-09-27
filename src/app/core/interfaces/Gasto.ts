import { Sucursal } from './Sucursal';
import { Usuario } from './Usuario';

export interface Gasto {
    idGasto: number;
    idUsuario: number;
    idSucursal: number;
    serieFactura: string;
    numeroFactura: string;
    fechaHora: number;
    estado: number;
    usuario?: Usuario;
    sucursal?: Sucursal;
    gasto?:  Gasto[];
}
