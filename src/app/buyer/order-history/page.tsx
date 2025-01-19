// OrderHistoryPage.tsx
"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout/PageLayout";
import OrderList from "@/components/OrderHistoryContents/OrderList"; // OrderList import
import { PageDTO } from "@/lib/types/PageDTO";
import { PageButtonType } from "@/lib/enum/PageButtonType";
import { OrderDTO } from "@/lib/types/OrderDTO";
import { buyerOrderService } from "@/lib/api/buyerOrderService";
import OrderSummary from "@/components/OrderHistoryContents/OrderSummary";
import styles from "./OrderHistory.module.css";  // 파일명 변경
import Pagination from "@/components/OrderManagementContents/Pagination";  // 경로 수정

export default function OrderHistoryPage() {
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 후에 주석 다시 풀어야됨
  // useEffect(() => {
  //   const email = sessionStorage.getItem('userEmail');
  //   if (email) {
  //     fetchOrders(email);
  //   } else {
  //     setLoading(false);  // 이메일이 없을 때 로딩 상태 해제
  //     window.location.href = '/buyer/email-input';
  //   }
  // }, []);

  const fetchOrders = async (email: string) => {
    try {
      const data = await buyerOrderService.getOrders(email);
      setOrderPage(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrderPage(null);
    } finally {
      setLoading(false);
    }
  };

  // 테스트용
  useEffect(() => {
    const email = 'customer1@example.com';
    if (email) {
      fetchOrders(email);
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행


  const handleBodyClick = (e: React.MouseEvent) => {
    if (selectedOrder && !(e.target instanceof HTMLElement && e.target.closest('.sidebar'))) {
      setSelectedOrder(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <PageLayout
      mainContent={
        <div className={styles.mainContainer} onClick={handleBodyClick}>
          <div className={styles.header}>
            {/* 검색 기능은 제외 */}
          </div>
          <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
              <OrderList 
                orderPage={orderPage}
                loading={loading}
                email={'customer1@example.com'}
                setSelectedOrder={setSelectedOrder}
              />
            </div>
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={orderPage?.totalPages || 0} 
            onPageChange={handlePageChange} 
          />
        </div>
      }
      sidebarContent={
        selectedOrder && (
          <OrderSummary
            email={selectedOrder.customerEmail}
            address={`[${selectedOrder.address.zipCode}] ${selectedOrder.address.baseAddress} ${selectedOrder.address.detailAddress}`}
            orderNumber={selectedOrder.orderId.toString()}
          />
        )
      }
      pageButtonType={PageButtonType.ProductList}
      targetPage="/buyer/product-list"
    />
  );
}
