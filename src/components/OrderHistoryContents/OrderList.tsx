// OrderList.tsx
import ListLayout from "@/components/ListLayout/ListLayout";
import OrderSummary from "@/components/OrderHistoryContents/OrderSummary";
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
  email: string | null;
}

const OrderList = ({ orderPage, loading, email }: OrderListProps) => {
  return loading ? (
    <div className={styles.loadingContainer}>
      <p>로딩 중...</p>
    </div>
  ) : (
    <div className={styles.emptyState}>
      {orderPage?.items.length === 0 ? (
        <p className={styles.emptyContent}>주문 내역이 없습니다.</p>
      ) : (
        <div className={styles.container}>
          <button className={styles.managementButton}>상품 주문</button>
          <div className={styles.mainContainer}>
            <div className={styles.orderContainer}>
              {orderPage?.items?.map((order) => (
                <div key={order.orderId} className={styles.orderGroup}>
                  <div className={styles.orderHeader}>
                    <p>{order.customerEmail}</p>
                    <p>
                      {formatDate(order.orderCreatedAt)} {order.orderStatus}
                    </p>
                  </div>
                  <ListLayout
                    products={order.orderDetails
                      .filter(detail => detail.product)
                      .map(detail => ({
                        ...detail.product,
                        cartQuantity: detail.productQuantity  // orderDetail의 수량 정보 전달
                      }))} 
                  />
                  <div className={styles.footer}>
                    <button
                      className={styles.cancel}
                      onClick={() =>
                        console.log("모달 뜨는 액션 추가 필요")
                      }
                    >
                      주문 취소
                    </button>
                    <p>합계 {order.totalPrice}원</p>
                  </div>
                </div>
              ))}
            </div>
            <OrderSummary
              email={orderPage?.items[0]?.customerEmail || ""}
              address={`${orderPage?.items[0]?.address?.baseAddress || ""} ${
                orderPage?.items[0]?.address?.detailAddress || ""
              }`}
              orderNumber={orderPage?.items[0]?.address?.zipCode || ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
