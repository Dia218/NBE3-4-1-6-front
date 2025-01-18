"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout/PageLayout";
import ListLayout from "@/components/ListLayout/ListLayout";
import Summary from "@/components/Summary/Summary";
import { sellerOrderService } from "@/lib/api/sellerOrderService";
import { OrderDTO } from "@/lib/types/OrderDTO";
import { PageDTO } from "@/lib/types/PageDTO";
import styles from "./OrderManagement.module.css";
import { useSearchParams } from "next/navigation";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function OrderHistoryPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // URL에서 이메일 파라미터 가져오기
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetchOrders(email); // 이메일이 있을 때만 주문 가져오기
    }
  }, [email]);

  const fetchOrders = async (email: string) => {
    try {
      setLoading(true);
      const data = await sellerOrderService.getOrders(0, 10, email); // 이메일로 주문 검색
      setOrderPage(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrderPage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout
      mainContent={
        loading ? (
          <div className={styles.loadingContainer}>
            <p>로딩 중...</p>
          </div>
        ) : (
          <div className={styles.emptyState}>
            {orderPage?.items.length === 0 ? (
              <p className={styles.emptyContent}>주문 내역이 없습니다.</p>
            ) : (
              <>
                <div className={styles.container}>
                  <button className={styles.managementButton}>상품 주문</button>
                  <div className={styles.mainContainer}>
                    <div className={styles.orderContainer}>
                      {orderPage?.items?.map((order) => (
                        <div key={order.orderId} className={styles.orderGroup}>
                          <div className={styles.orderHeader}>
                            <p>{order.customerEmail}</p>
                            <p>
                              {formatDate(order.orderCreatedAt)}{" "}
                              {order.orderStatus}
                            </p>
                          </div>
                          <ListLayout
                            products={order.orderDetails.map(
                              (detail) => detail.productDTO
                            )}
                          />
                          <div className={styles.footer}>
                            <button
                              className={styles.cancel}
                              onClick={() =>
                                console.log("모달 뜨는 액션 추가해라라")
                              }
                            >
                              주문 취소
                            </button>
                            <p>합계 {order.totalPrice}원</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.summaryContainer}>
                      <Summary
                        email={orderPage?.items[0]?.customerEmail || ""}
                        address={`${orderPage?.items[0]?.baseAddress || ""} ${
                          orderPage?.items[0]?.detailAddress || ""
                        }`}
                        orderNumber={orderPage?.items[0]?.zipCode || ""}
                        hasGuidingText={true}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )
      }
    >
      {/* 사이드바 또는 다른 콘텐츠가 필요하다면 여기에 추가 */}
    </PageLayout>
  );
}
