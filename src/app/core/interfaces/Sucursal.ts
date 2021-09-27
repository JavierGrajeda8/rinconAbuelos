import { Empresa } from './Empresa';

export interface Sucursal {
    idSucursal: number;
    idEmpresa: number;
    nombre: string;
    estado: number;
    empresa: Empresa;
}
