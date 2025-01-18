// 주문 넣을 때 사용하는 타입
export interface OrderRequestDTO {
    email: string; 
    baseAddress: string; 
    detailAddress: string; 
    zipCode: string; 
    totalPrice: number;
}