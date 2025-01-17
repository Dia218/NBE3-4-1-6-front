// src/lib/api/deliveryService.ts
// import axios from 'axios'; - axios 대신 fetch로 수정할 예정
import { DeliveryDTO } from '../types/DeliveryDTO';

// axios 인스턴스 생성
//const api = axios.create({
//    baseURL: 'http://localhost:8080/api',
//    headers: {
//        'Content-Type': 'application/json',
//    }
//});

// 배송 서비스 클래스
export const deliveryService = {
    // 배송 ID로 배송 정보 조회
    getDeliveryById: async (deliveryId: number): Promise<DeliveryDTO> => {
        try {
           const response = await api.get<DeliveryDTO>(`/delivery/${deliveryId}`);
            return response.data;
        } catch (error) {
            throw new Error('배송 정보를 불러오는데 실패했습니다.');
        }
    },

    // 주문 ID로 배송 정보 조회
    getDeliveryByOrderId: async (orderId: number): Promise<DeliveryDTO> => {
        try {
            const response = await api.get<DeliveryDTO>(`/delivery/order/${orderId}`);
            return response.data;
        } catch (error) {
            throw new Error('주문에 대한 배송 정보를 불러오는데 실패했습니다.');
        }
    }
};