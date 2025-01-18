import { Address } from "./AddressDTO";
import { DeliveryDTO } from "./DeliveryDTO";
import { OrderDetailDTO } from "./OrderDetailDTO";
import { OrderStatus } from "./OrderStatusDTO";

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