import { ProductDTO } from './productDTO';

export interface OrderDetailDTO {
    orderDetailId: number;
    productQuantity: number;
    orderPrice: number;
    orderId: number;
    product: ProductDTO;
}