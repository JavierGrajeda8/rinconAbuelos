import { Producto } from './Producto';

export interface Categoria {
    idCategoria: number;
    idSucursal?: number;
    nombre: string;
    estado: number;
    productos?: Producto[];
}
