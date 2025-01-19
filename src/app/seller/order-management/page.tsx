'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import { sellerOrderService } from '@/lib/api/sellerOrderService';
import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/PageDTO';
import { useSearchParams } from 'next/navigation';
import SearchEmailInput from '@/components/OrderManagementContents/Search';
import OrderList from '@/components/OrderManagementContents/OrderList';
import Pagination from '@/components/OrderManagementContents/Pagination';
import styles from './OrderManagement.module.css';
import Summary from '@/components/Summary/Summary';
import { PageButtonType } from '@/lib/enum/PageButtonType';

export default function OrderManagementPage() {
  const searchParams = useSearchParams();
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
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

  const fetchOrders = async (email?: string) => {
    try {
      const data = await sellerOrderService.getOrders(currentPage, 10, email);
      setOrderPage(data);
      if (data.items && data.items.length > 0 && !selectedOrder) {
        setSelectedOrder(data.items[0]);
      }
    } catch (err) {
      setOrderPage({
        currentPageNumber: 0,
        pageSize: 10,
        totalPages: 0,
        totalItems: 0,
        items: [],
      });
    }
  };

  const handleSearchEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchOrders(searchEmail);
    }
  };

  const filteredOrders = orderPage?.items.filter(order => 
    order.customerEmail.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleBodyClick = (e: React.MouseEvent) => {
    if (selectedOrder && !(e.target instanceof HTMLElement && e.target.closest('.sidebar'))) {
      setSelectedOrder(null);
    }
  };

  return (
    <PageLayout
      mainContent={
        <div onClick={handleBodyClick}>
          <div className={styles.header}>
            <SearchEmailInput
              searchEmail={searchEmail}
              onSearchEmailChange={handleSearchEmailChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className={styles.pageContainer}>
            <div className={styles.mainContent}>
              <OrderList 
                orders={filteredOrders || []} 
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
      sidebarContent={selectedOrder ? <Summary selectedOrder={selectedOrder} /> : null}
      pageButtonType={PageButtonType.ProductManagement}
      targetPage="/seller/product-management"
    />
  );
}
