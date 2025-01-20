import React from 'react';
import styles from './OrderCancelModal.module.css';

interface OrderCancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  timestamp?: string;
}

const OrderCancelModal: React.FC<OrderCancelModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  timestamp
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.messageContainer}>
          {timestamp && <p className={styles.timestamp}>{timestamp}</p>}
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            예
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCancelModal; 