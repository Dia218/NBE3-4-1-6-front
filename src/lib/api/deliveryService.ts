import { DeliveryDTO } from "../types/DeliveryDTO";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// 모든 배송 정보 조회
export async function getAllDeliveries(): Promise<DeliveryDTO[]> {
  try {
    const response = await fetch(`${BASE_URL}/delivery`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("배송 목록 조회에 실패했습니다");
    }

    return await response.json();
  } catch (error) {
    console.error("배송 목록 조회 중 오류 발생:", error);
    throw error;
  }
}

// 특정 배송 정보 조회
export async function getDeliveryById(
  deliveryId: number
): Promise<DeliveryDTO> {
  try {
    const response = await fetch(`${BASE_URL}/delivery/${deliveryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("배송 정보 조회에 실패했습니다");
    }

    return await response.json();
  } catch (error) {
    console.error("배송 정보 조회 중 오류 발생:", error);
    throw error;
  }
}

// 주문 ID로 배송 정보 조회
export async function getDeliveryByOrderId(
  orderId: number
): Promise<DeliveryDTO> {
  try {
    const response = await fetch(`${BASE_URL}/delivery/order/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("주문에 대한 배송 정보 조회에 실패했습니다");
    }

    return await response.json();
  } catch (error) {
    console.error("주문별 배송 정보 조회 중 오류 발생:", error);
    throw error;
  }
}
