import React from 'react';
import OrderBox from '@/components/OrderBox/OrderBox';
import { OrderDTO } from '@/lib/types/OrderDTO';
import styles from './OrderList.module.css';

interface OrderListProps {
  orders: OrderDTO[];
  setSelectedOrder: (order: OrderDTO) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, setSelectedOrder }) => {
  if (!orders?.length) return <div>주문 내역이 없습니다.</div>;

  return (
    <div className={styles.container}>
      {orders.map((order) => (
        <OrderBox
          key={order.orderId}
          order={order}
          onSelect={setSelectedOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;