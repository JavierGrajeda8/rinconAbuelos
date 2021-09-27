import { Material } from './Material';

export interface MaterialDetalle {
  idMaterialDetalle: number;
  idMaterial: number;
  lote: number;
  cantidad: number;
  fecha: number;
  fechaExpiracion?: number;
  estado: number;
  material?: Material;
}
