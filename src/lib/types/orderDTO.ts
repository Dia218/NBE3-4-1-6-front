import { Address } from "./addressDTO";
import { DeliveryDTO } from "./deliveryDTO";
import { OrderDetailDTO } from "./orderDetailDTO";
import { OrderStatus } from "./orderStatusDTO";

export interface OrderDTO {
  orderId: number;
  customerEmail: string;
  address: Address;
  orderCreatedAt: string; // ISO 8601 date string
  totalPrice: number;
  orderStatus: OrderStatus;
  delivery: DeliveryDTO;
  orderDetails: OrderDetailDTO[];
}