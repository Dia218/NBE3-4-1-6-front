import React from "react";
import { OrderDTO } from "@/lib/types/OrderDTO";
import styles from "./OrderSummary.module.css";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@/lib/types/OrderStatusDTO";

interface OrderSummaryProps {
  selectedOrder: OrderDTO;
  hasGuidingText?: boolean;
}

// 문자열을 OrderStatus enum으로 매핑
const mappedOrderStatus = (status: string): OrderStatus => {
  switch (status) {
    case "ORDERED":
      return OrderStatus.ORDERED;
    case "CANCELLED":
      return OrderStatus.CANCELLED;
    case "PREPARING":
      return OrderStatus.PREPARING;
    case "DELIVERED":
      return OrderStatus.DELIVERED;
    default:
      throw new Error(`Unknown order status: ${status}`);
  }
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedOrder,
  hasGuidingText = false,
}) => {
  const router = useRouter();

  const handleDetailClick = () => {
    if (selectedOrder?.orderId) {
      router.push(`/buyer/shipping-detail/${selectedOrder.orderId}`);
    }
  };

  // 버튼 비활성화 조건
  const isButtonDisabled =
    mappedOrderStatus(selectedOrder.orderStatus) === OrderStatus.ORDERED ||
    mappedOrderStatus(selectedOrder.orderStatus) === OrderStatus.CANCELLED;

  // 디버깅 로그
  console.log("selectedOrder.orderStatus:", selectedOrder.orderStatus);
  console.log(
    "mappedOrderStatus:",
    mappedOrderStatus(selectedOrder.orderStatus)
  );
  console.log("isButtonDisabled:", isButtonDisabled);

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Summary</h2>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.label}>이메일</h3>
          <p className={styles.value}>{selectedOrder.customerEmail}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.label}>주소</h3>
          <p
            className={styles.value}
          >{`${selectedOrder.address.baseAddress} ${selectedOrder.address.detailAddress}`}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.label}>우편번호</h3>
          <p className={styles.value}>{selectedOrder.address.zipCode}</p>
        </div>
        {hasGuidingText && (
          <div className={styles.guidingText}>
            <p className={styles.text}>
              당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.
            </p>
            <p className={styles.text}>
              주문 취소 및 수정은 배송 전에만 가능합니다.
            </p>
          </div>
        )}
        <div className={styles.divider}></div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleDetailClick}
            disabled={isButtonDisabled}
            className={`${styles.detailButton} ${
              isButtonDisabled ? styles.disabledButton : ""
            }`}
          >
            배송 조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
