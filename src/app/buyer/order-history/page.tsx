// OrderHistoryPage.tsx
"use client";

import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout/PageLayout";
import OrderList from "@/components/OrderHistoryContents/OrderList"; // OrderList import
import { sellerOrderService } from "@/lib/api/sellerOrderService";
import { PageDTO } from "@/lib/types/PageDTO";
import { useSearchParams } from "next/navigation";
import styles from "./OrderManagement.module.css";
import { PageButtonType } from "@/lib/enum/PageButtonType";

export default function OrderHistoryPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // URL에서 이메일 파라미터 가져오기
  const [orderPage, setOrderPage] = useState<PageDTO<any> | null>(null);
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
        <div className={styles.mainContent}>
          <OrderList orderPage={orderPage} loading={loading} email={email} /> {/* OrderList 컴포넌트 사용 */}
        </div>
      }
      pageButtonType={PageButtonType.ProductList} // 전달된 페이지 버튼 타입
      targetPage="/buyer/product-list" // targetPage 경로 지정
    >
    </PageLayout>
  );
}
