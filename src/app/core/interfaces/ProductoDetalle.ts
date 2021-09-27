import { Material } from './Material';
import { Producto } from './Producto';

export interface ProductoDetalle {
    idProdutoDetalle: number;
    idProducto: number;
    idMaterial: number;
    costoPromedio: number;
    cantidad: number;
    paraLlevar: boolean;
    afectaPrecio: boolean;
    estado: number;
    producto?: Producto;
    material?: Material;
}
