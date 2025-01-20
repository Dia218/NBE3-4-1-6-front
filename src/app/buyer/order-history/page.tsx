// OrderHistoryPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import PageLayout from "@/components/PageLayout/PageLayout";
import OrderList from "@/components/OrderHistoryContents/OrderList";
import { PageDTO } from "@/lib/types/PageDTO";
import { PageButtonType } from "@/lib/enum/PageButtonType";
import { OrderDTO } from "@/lib/types/OrderDTO";
import { buyerOrderService } from "@/lib/api/buyerOrderService";
import styles from "./OrderHistory.module.css";
import Pagination from "@/components/OrderManagementContents/Pagination";
import OrderSummary from "@/components/OrderHistoryContents/OrderSummary";

export default function OrderHistoryPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchOrders = async (email: string, page: number) => {
    try {
      setLoading(true);
      const data = await buyerOrderService.getOrders(email, page);
      setOrderPage(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchOrders(email, currentPage);
    }
  }, [email, currentPage]);

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
            email={email || ''}
            setSelectedOrder={setSelectedOrder}
            refreshOrders={() => {
              if (email) {
                fetchOrders(email, currentPage);
              }
            }}
          />
        </div>
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={orderPage?.totalPages || 0} 
        onPageChange={setCurrentPage}
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
