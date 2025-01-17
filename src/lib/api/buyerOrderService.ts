import { OrderRequestDTO } from "../types/OrderRequestDTO";
import { ErrorDetails } from "../types/ErrorDetails";

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