import React from 'react';
import OrderBox from '@/components/OrderBox/OrderBox';
import { OrderDTO } from "@/lib/types/OrderDTO";
import { PageDTO } from "@/lib/types/PageDTO";
import styles from "./OrderList.module.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

interface OrderListProps {
  orderPage: PageDTO<OrderDTO> | null;
  loading: boolean;
  email: string;
  setSelectedOrder: (order: OrderDTO) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orderPage, loading, setSelectedOrder }) => {
  if (loading) return <div>Loading...</div>;
  if (!orderPage?.items?.length) return <div>주문 내역이 없습니다.</div>;

  return (
    <div className={styles.container}>
      {orderPage.items.map((order) => (
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
