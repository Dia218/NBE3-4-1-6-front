// OrderHistoryPage.tsx
"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout/PageLayout";
import OrderList from "@/components/OrderHistoryContents/OrderList";
import { PageDTO } from "@/lib/types/PageDTO";
import { PageButtonType } from "@/lib/enum/PageButtonType";
import { OrderDTO } from "@/lib/types/OrderDTO";
import { buyerOrderService } from "@/lib/api/buyerOrderService";
import styles from "./OrderHistory.module.css";
import Pagination from "@/components/OrderManagementContents/Pagination";
import OrderSummary from "@/components/OrderHistoryContents/OrderSummary";

const TEST_EMAIL = 'customer1@example.com';  // 테스트용 이메일 상수화

export default function OrderHistoryPage() {
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(0);  // 0부터 시작하도록 수정

  const fetchOrders = async (email: string, page: number = 0) => {
    setLoading(true);
    try {
      const data = await buyerOrderService.getOrders(email, page);
      setOrderPage(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrderPage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(TEST_EMAIL, currentPage);
  }, [currentPage]);

  const handleBodyClick = (e: React.MouseEvent) => {
    if (selectedOrder && !(e.target instanceof HTMLElement && e.target.closest('.sidebar'))) {
      setSelectedOrder(null);
    }
  };

  const renderSidebarContent = () => (
    selectedOrder && (
      <OrderSummary 
        selectedOrder={selectedOrder}
        hasGuidingText={true}
      />
    )
  );

  const renderMainContent = () => (
    <div className={styles.mainContainer} onClick={handleBodyClick}>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <OrderList 
            orderPage={orderPage}
            loading={loading}
            email={TEST_EMAIL}
            setSelectedOrder={setSelectedOrder}
            refreshOrders={() => fetchOrders(TEST_EMAIL)}
          />
        </div>
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={orderPage?.totalPages || 0} 
        onPageChange={setCurrentPage}  // 직접 setCurrentPage 전달
      />
    </div>
  );

  return (
    <PageLayout
      mainContent={renderMainContent()}
      sidebarContent={renderSidebarContent()}
      pageButtonType={PageButtonType.ProductList}
      targetPage="/buyer/product-list"
    />
  );
}
