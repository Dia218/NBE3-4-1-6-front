import { OrderRequestDTO } from "../types/OrderRequestDTO";
import { ErrorDetails } from "../types/ErrorDetails";
import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/PageDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function submitOrder(formData : OrderRequestDTO) : Promise<void> {
    try {
        const response = await fetch('http://localhost:8080/order', {
            method: 'POST',
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
  getOrders: async (email: string): Promise<PageDTO<OrderDTO>> => {
    try {
      const url = `${API_BASE_URL}/order/list?email=${encodeURIComponent(email)}`;
      console.log('Fetching orders from:', url);  // URL 확인용 로그

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Response not ok:', response.status);  // 응답 상태 확인
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log('Received data:', data);  // 받은 데이터 확인
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};