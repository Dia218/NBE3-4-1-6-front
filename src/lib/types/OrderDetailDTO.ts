import { ProductDTO } from "./ProductDTO";

export interface OrderDetailDTO {
    orderDetailId: number;
    productQuantity: number;
    orderPrice: number;
    product: ProductDTO;
  }