import { OrderDTO } from "./orderDTO";
import { ProductDTO } from "./productDTO";

export interface OrderDetailDTO {
    orderDetailId: number;
    productQuantity: number;
    orderPrice: number;
    product: ProductDTO;
    order: OrderDTO;
  }