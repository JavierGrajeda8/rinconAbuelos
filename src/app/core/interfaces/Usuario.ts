import { Gasto } from './Gasto';
import { Sucursal } from './Sucursal';
import { Venta } from './Venta';

export interface Usuario {
    idUsuario: string;
    idSucursal?: number;
    nombre: string;
    alias: string;
    telefono: number;
    correo: string;
    tipo: number;
    estado: number;
    ventas?: Venta[];
    gastos?: Gasto[];
    sucursal?: Sucursal;
    password?: string;
}
