import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/pageDTO';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export const sellerOrderService = {
  // 주문 목록 조회 (페이지네이션, 이메일 검색 지원)
  getOrders: async (
    page: number = 0,
    size: number = 10,
    email?: string
  ): Promise<PageDTO<OrderDTO>> => {
    try {
      let url = `${API_BASE_URL}/admin/orders?page=${page}&size=${size}`;
      if (email) {
        url += `&email=${encodeURIComponent(email)}`;
      }

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
  }
};
