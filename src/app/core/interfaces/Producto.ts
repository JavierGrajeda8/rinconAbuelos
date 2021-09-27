import { Categoria } from './Categoria';

export interface Producto {
    idProducto: number;
    idCategoria: number;
    nombre: string;
    costo: number;
    precioVenta: number;
    estado: number;
    categoria?: Categoria;
}
