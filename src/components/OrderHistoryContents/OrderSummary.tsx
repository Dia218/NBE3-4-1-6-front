import React from 'react';
import { OrderDTO } from '@/lib/types/OrderDTO';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  selectedOrder: OrderDTO;
  hasGuidingText?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedOrder, hasGuidingText = false }) => {
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
          <p className={styles.value}>{`${selectedOrder.address.baseAddress} ${selectedOrder.address.detailAddress}`}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.label}>우편번호</h3>
          <p className={styles.value}>{selectedOrder.address.zipCode}</p>
        </div>
        {hasGuidingText && (
          <div className={styles.guidingText}>
            <p className={styles.text}>당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</p>
            <p className={styles.text}>주문 취소 및 수정은 배송 전에만 가능합니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
