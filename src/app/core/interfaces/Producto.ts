import { Categoria } from './Categoria';
import { ProductoDetalle } from './ProductoDetalle';

export interface Producto {
    idProducto: number;
    idCategoria: number;
    nombre: string;
    descripcion?: string;
    costo: number;
    precioVenta: number;
    estado: number;
    categoria?: Categoria;
    detalle?: ProductoDetalle;
}
