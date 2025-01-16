import { OrderDetailDTO } from "./OrderDetailDTO";
import { OrderStatus } from "./OrderStatusDTO";

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