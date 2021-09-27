import { Material } from './Material';

export interface MaterialDetalle {
    idMaterialDetalle: number;
    idMaterial: number;
    lote: number;
    cantidad: number;
    caduca: boolean;
    estado: number;
    material?: Material;
}
