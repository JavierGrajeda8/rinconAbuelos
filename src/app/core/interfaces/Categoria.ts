import { Producto } from './Producto';

export interface Categoria {
    idCategoria: number;
    nombre: string;
    estado: number;
    productos?: Producto[];
}
