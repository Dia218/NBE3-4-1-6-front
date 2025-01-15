import { OrderDetailDTO } from "./orderDetailDTO";
import { OrderStatus } from "./orderStatusDTO";

export interface OrderDTO {
  orderId: number;
  customerEmail: string;
  baseAddress: string;
  detailAddress: string;
  zipCode: string;
  orderCreatedAt: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  deliveryId: number | null;
  orderDetails: OrderDetailDTO[];
}