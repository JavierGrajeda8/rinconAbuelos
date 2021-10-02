import { MaterialDetalle } from './MaterialDetalle';
import { Producto } from './Producto';

export interface Material {
    idMaterial: number;
    idSucursal?: number;
    nombre: string;
    unidadMedida: string;
    descripcion: string;
    cantidad: number;
    costoPromedio: number;
    caduca: boolean;
    estado: number;
    productos?: Producto[];
    materialDetalle?: MaterialDetalle[];
}
