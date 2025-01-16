'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import ListLayout from '@/components/ListLayout/ListLayout';
import Summary from '@/components/Summary/Summary';
import { sellerOrderService } from '@/lib/api/sellerOrderService';
import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/pageDTO';
import styles from './OrderManagement.module.css';
import { useSearchParams } from 'next/navigation';

export default function OrderManagementPage() {
  const searchParams = useSearchParams();
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchEmail, setSearchEmail] = useState('');

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const page = pageParam ? Number(pageParam) - 1 : 0;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await sellerOrderService.getOrders(currentPage);
      console.log('Received data:', data);
      setOrderPage(data);
      if (data.items && data.items.length > 0 && !selectedOrder) {
        setSelectedOrder(data.items[0]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrderPage({
        currentPageNumber: 0,
        pageSize: 10,
        totalPages: 0,
        totalItems: 0,
        items: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  const filteredOrders = orderPage?.items.filter(order => 
    order.customerEmail.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // 마지막 두 자리
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 01-12
    const day = String(date.getDate()).padStart(2, '0'); // 01-31
    const hours = String(date.getHours()).padStart(2, '0'); // 00-23
    const minutes = String(date.getMinutes()).padStart(2, '0'); // 00-59
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <PageLayout>
        <div className={styles.loadingContainer}>
          <p>로딩 중...</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={styles.header}>
        <button className={styles.managementButton}>
          상품 관리
        </button>
      </div>
      
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
        <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="이메일로 검색"
          value={searchEmail}
          onChange={handleSearchEmailChange}
          className={styles.searchInput}
        />
      </div>
          <div className={styles.container}>
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div 
                  key={order.orderId} 
                  className={styles.orderGroup}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className={styles.orderHeader}>
                    <p>{order.customerEmail}</p>
                    <p>{formatDate(order.orderCreatedAt)} {order.orderStatus}</p>
                  </div>
                  <ListLayout 
                    products={order.orderDetails.map(detail => detail.product)}
                  />
                  <div className={styles.totalAmount}>
                    <p>합계 {order.totalPrice}원</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.orderGroup}>
                <div className={styles.orderHeader}>
                  <p>주문 내역이 없습니다</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.sidebar}>
          <Summary 
            email={selectedOrder?.customerEmail || ""}
            address={`${selectedOrder?.baseAddress || ""} ${selectedOrder?.detailAddress || ""}`}
            orderNumber={selectedOrder?.zipCode || ""}
          />
        </div>
      </div>
      <div className={styles.pagination}>
        {orderPage && orderPage.totalPages > 0 && (
          <>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 0}
            >
              이전
            </button>
            <span>{currentPage + 1 <= orderPage.totalPages ? currentPage + 1 : orderPage.totalPages} / {orderPage.totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage + 1 >= orderPage.totalPages}
            >
              다음
            </button>
          </>
        )}
      </div>
    </PageLayout>
  );
}
