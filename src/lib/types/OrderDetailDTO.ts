import { ProductDTO } from './ProductDTO';

export interface OrderDetailDTO {
    orderDetailId: number;
    productQuantity: number;
    orderPrice: number;
    orderId: number;
    product: ProductDTO;
}