export interface SimpleOrderInfo {
  orderId: number;
  orderStatus: "ORDERED" | "PREPARING" | "DELIVERING" | "DELIVERED";
}

export interface DeliveryDTO {
  deliveryId: number; // 배송 ID
  deliveryNumber: string; // 운송장 번호
  deliveryCompany: string; // 택배사
  orderId: number; // 주문 ID
  order: SimpleOrderInfo; // 주문 정보
}
