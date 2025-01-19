import { OrderDTO } from "@/lib/types/OrderDTO";
import ListLayout from "@/components/ListLayout/ListLayout";
import styles from "./OrderBox.module.css";

interface OrderBoxProps {
  order: OrderDTO;
  onSelect: (order: OrderDTO) => void;
}

const OrderBox = ({ order, onSelect }: OrderBoxProps) => {
  return (
    <div className={styles.orderGroup} onClick={() => onSelect(order)}>
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
};

export default OrderBox;
