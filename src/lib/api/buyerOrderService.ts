import { OrderRequestDTO } from "../types/OrderRequestDTO";
import { ErrorDetails } from "../types/ErrorDetails";
import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/PageDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function submitOrder(formData : OrderRequestDTO) : Promise<void> {
    try {
        const response = await fetch('http://localhost:8080/order', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData: ErrorDetails = await response.json();
            alert(`오류: ${errorData.message}`);
            return;
        }

        alert('주문이 성공적으로 처리됐습니다.');
    } catch (error) {
        console.log(error)
        alert('주문 처리 중 오류가 발생했습니다.');
    }
}

export const buyerOrderService = {
  // 구매자 주문 목록 조회
  getOrders: async (email: string, page: number = 0): Promise<PageDTO<OrderDTO>> => {
    try {
      const url = `${API_BASE_URL}/order/list?email=${encodeURIComponent(email)}&page=${page}`;
      console.log('Fetching orders from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // 주문 취소 메서드 추가
  cancelOrder: async (orderId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/order/list?orderId=${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  }
};