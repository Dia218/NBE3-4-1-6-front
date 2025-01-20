import { OrderDTO } from './OrderDTO';

export interface DeliveryDTO {
    deliveryId: number;
    deliveryNumber: string;
    deliveryCompany: string;
    orderId: number;
    order: OrderDTO;
}