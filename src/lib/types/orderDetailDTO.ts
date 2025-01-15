import { OrderDTO } from "./OrderDTO";
import { ProductDTO } from "./ProductDTO";

export interface OrderDetailDTO {
    orderDetailId: number;
    productQuantity: number;
    orderPrice: number;
    product: ProductDTO;
    order: OrderDTO;
  }