"use client";

import { getDeliveryByOrderId } from "@/lib/api/deliveryService";
import { DeliveryDTO } from "@/lib/types/DeliveryDTO";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DeliveryInfo } from "@/components/Delivery/DeliveryInfo";
import { StatusCircle } from "@/components/Delivery/StatusCircle";
import { Summary } from "@/components/Delivery/Summary";
import { OrderStatus } from "@/lib/types/OrderStatusDTO";

export default function ShippingDetailPage() {
  const params = useParams();
  const [delivery, setDelivery] = useState<DeliveryDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusText = (status: string) => {
    switch (status) {
      case "ORDERED":
        return "주문 완료";
      case "PREPARING":
        return "배송 중";
      case "DELIVERED":
        return "배송 완료";
      default:
        return status;
    }
  };

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const orderId = Number(params.orderId);
        if (isNaN(orderId)) {
          throw new Error("잘못된 주문 번호입니다.");
        }

        const data = await getDeliveryByOrderId(orderId);
        setDelivery(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "배송 정보를 불러오는데 실패했습니다"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDelivery();
  }, [params.orderId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!delivery) return <div>배송 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 제목 */}
      <h1
        className="text-2xl font-bold text-center mb-12"
        style={{ color: "#b09c84" }}
      >
        배송 조회
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {/* 배송 정보 (2칸 차지) */}
        <div className="col-span-2">
          {/* 진행 상태 표시 */}
          <div className="bg-white rounded-lg mb-6">
            <StatusCircle currentStatus={delivery.order.orderStatus} />
          </div>

          {/* 배송 정보 */}
          <div className="bg-white rounded-lg">
            <div className="p-6">
              <h2 className="text-base font-semibold mb-6">배송 정보</h2>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">배송 번호</span>
                  <span className="text-sm">{delivery.deliveryNumber}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">배송사</span>
                  <span className="text-sm">{delivery.deliveryCompany}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600 mb-1">주문 상태</span>
                  <span className="text-sm">
                    {getStatusText(delivery.order.orderStatus)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 배송 안내 */}
        <div>
          <Summary />
        </div>
      </div>
    </div>
  );
}
