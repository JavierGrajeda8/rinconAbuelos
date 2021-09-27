import { Sucursal } from './Sucursal';

export interface Empresa {
    idEmpresa: number;
    nombre: string;
    razonSocial: string;
    telefono: number;
    nit: string;
    estado: number;
    sucursales?: Sucursal[];
}
