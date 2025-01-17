import OrderRequestComponent from "@/components/OrderRequestLayout/OrderRequestLayout";


export default function CartPage() {
    return (
    <>
        <OrderRequestComponent totalPrice={1000}/> 
    </>
    );
    // 1000은 임시 데이터로, 실제로는 장바구니에 담긴 상품의 총 가격에 대한 state 를 전달해야 함
  }