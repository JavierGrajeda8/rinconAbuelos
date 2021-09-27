import { Gasto } from './Gasto';
import { Material } from './Material';

export interface GastoDetalle {
    idGasto: number;
    idMaterial: number;
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    fechaHora: number;
    estado: number;
    material?: Material;
    gasto?: Gasto;
}
