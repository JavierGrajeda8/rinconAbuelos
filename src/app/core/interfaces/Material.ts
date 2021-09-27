import { MaterialDetalle } from './MaterialDetalle';
import { Producto } from './Producto';

export interface Material {
    idMaterial: number;
    nombre: string;
    unidadMedida: number;
    descripcion: string;
    cantidad: number;
    costoPromedio: number;
    estado: number;
    productos?: Producto[];
    materialDetalle?: MaterialDetalle[];
}
