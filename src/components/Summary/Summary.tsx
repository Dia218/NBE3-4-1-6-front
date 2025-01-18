import React from 'react';
import styles from './Summary.module.css';

interface SummaryProps {
  email: string;
  address: string;
  orderNumber: string;
  hasGuidingText?: boolean;
}

export default function Summary({ email, address, orderNumber, hasGuidingText=false }: SummaryProps) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>Summary</h2>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.label}>이메일</h3>
          <p className={styles.value}>{email}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.label}>주소</h3>
          <p className={styles.value}>{address}</p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.label}>우편번호</h3>
          <p className={styles.value}>{orderNumber}</p>
        </div>
        {/* 구매자 주문목록 Summary 안내 메시지 */}
        {hasGuidingText && (
        <div className={styles.guidingText}>
          <p className={styles.text}>당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</p>
          <p className={styles.text}>주문 취소 및 수정은 배송 시작 1시간 (오후 1시) 전까지 가능합니다.</p>
        </div>
            )}
      </div>
    </div>
  );
} 