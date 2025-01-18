import React from 'react';
import ListLayout from '@/components/ListLayout/ListLayout';
import { OrderDTO } from '@/lib/types/OrderDTO';
import styles from './OrderList.module.css';

interface OrderListProps {
  orders: OrderDTO[];
  setSelectedOrder: (order: OrderDTO) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, setSelectedOrder }) => {
  return (
    <div className={styles.container}>
      {orders.length > 0 ? (
        orders.map((order, index) => {
          const products = order.orderDetails
            .filter(detail => detail.product)
            .map(detail => {
              const { productStock, ...restProductDTO } = detail.product;
              return {
                ...restProductDTO,
                productStock: detail.productQuantity,
                productDescription: `수량: ${detail.productQuantity}개\n${detail.product.productDescription}`,
              };
            });

          return (
            <div key={`${order.orderId}-${index}`} className={styles.orderGroup} onClick={() => setSelectedOrder(order)}>
              <div className={styles.orderHeader}>
                <p>{order.customerEmail}</p>
                <p>{new Date(order.orderCreatedAt).toLocaleString()} {order.orderStatus}</p>
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
                <p>합계 {order.totalPrice}원</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.orderGroup}>
          <div className={styles.orderHeader}>
            <p>주문 내역이 없습니다</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;