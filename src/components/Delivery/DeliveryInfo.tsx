// src/app/components/Delivery/DeliveryInfo.tsx
import { DeliveryDTO } from "@/lib/types/DeliveryDTO";
import { OrderStatus } from "@/lib/types/OrderStatusDTO";
import React from "react";

interface DeliveryInfoProps {
  delivery: DeliveryDTO;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ delivery }) => {
  const getStatusText = (status: string) => {
    return OrderStatus[status as keyof typeof OrderStatus] || status;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">운송장 번호</h3>
          <p className="mt-1 text-lg font-semibold">
            {delivery.deliveryNumber}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">택배사</h3>
          <p className="mt-1 text-lg font-semibold">
            {delivery.deliveryCompany}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">주문 번호</h3>
          <p className="mt-1 text-lg font-semibold">{delivery.orderId}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">배송 상태</h3>
          <p className="mt-1 text-lg font-semibold">
            {getStatusText(delivery.order.orderStatus)}
          </p>
        </div>
      </div>
    </div>
  );
};
