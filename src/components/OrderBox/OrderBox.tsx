import { useState } from 'react';
import { OrderDTO } from "@/lib/types/OrderDTO";
import { OrderStatus } from "@/lib/types/OrderStatusDTO";
import ListLayout from "@/components/ListLayout/ListLayout";
import OrderCancelModal from "@/components/OrderCancelModal/OrderCancelModal";
import styles from "./OrderBox.module.css";

interface OrderBoxProps {
  order: OrderDTO;
  onSelect: (order: OrderDTO) => void;
  hasCancelButton?: boolean;
  onCancelOrder?: (orderId: number) => void;
}

const OrderBox = ({ order, onSelect, hasCancelButton = false, onCancelOrder }: OrderBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmCancel = async () => {
    try {
      if (onCancelOrder) {
        await onCancelOrder(order.orderId);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('주문 취소 실패:', error);
      alert('주문 취소에 실패했습니다.');
    }
  };

  return (
    <>
      <div className={styles.orderGroup} onClick={() => onSelect(order)}>
        <div className={styles.orderHeader}>
          <p>{order.customerEmail}</p>
          <p>
            {`${new Date(order.orderCreatedAt).toLocaleString()} ${OrderStatus[order.orderStatus as unknown as keyof typeof OrderStatus]}`}
          </p>
        </div>
        <ListLayout
          products={order.orderDetails
            .filter(detail => detail.product)
            .map(detail => ({
              ...detail.product,
              cartQuantity: detail.productQuantity,
            }))}
        />
        <div className={styles.totalAmount}>
          <div className={styles.buttonWrapper}>
            {hasCancelButton && (
              <button 
                className={styles.cancelButton} 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                주문 취소
              </button>
            )}
          </div>
          <p>합계 {order.totalPrice.toLocaleString()}원</p>
        </div>
      </div>

      <OrderCancelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancel}
        message="주문을 취소하시겠습니까?"
        timestamp={`${new Date(order.orderCreatedAt).toLocaleString()} 건의`}
      />
    </>
  );
};

export default OrderBox;
