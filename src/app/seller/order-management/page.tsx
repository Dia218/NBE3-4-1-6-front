'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import { sellerOrderService } from '@/lib/api/sellerOrderService';
import { OrderDTO } from '@/lib/types/OrderDTO';
import { PageDTO } from '@/lib/types/PageDTO';
import SearchEmailInput from '@/components/OrderManagementContents/Search';
import OrderList from '@/components/OrderManagementContents/OrderList';
import Pagination from '@/components/OrderManagementContents/Pagination';
import Summary from '@/components/Summary/Summary';
import { PageButtonType } from '@/lib/enum/PageButtonType';
import styles from './OrderManagement.module.css';

export default function OrderManagementPage() {
  const [orderPage, setOrderPage] = useState<PageDTO<OrderDTO> | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchEmail, setSearchEmail] = useState('');

  const fetchOrders = async (email?: string) => {
    try {
      const data = await sellerOrderService.getOrders(currentPage, undefined, email);
      setOrderPage(data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrderPage({
        currentPageNumber: 0,
        pageSize: 5,
        totalPages: 0,
        totalItems: 0,
        items: [],
      });
    }
  };

  useEffect(() => {
    fetchOrders(searchEmail);
  }, [currentPage]);

  const handleSearchEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchOrders(searchEmail);
    }
  };

  const handleBodyClick = (e: React.MouseEvent) => {
    if (selectedOrder && !(e.target instanceof HTMLElement && e.target.closest('.sidebar'))) {
      setSelectedOrder(null);
    }
  };

  const renderMainContent = () => (
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
            orders={orderPage?.items || []} 
            setSelectedOrder={setSelectedOrder} 
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
      sidebarContent={selectedOrder ? <Summary selectedOrder={selectedOrder} /> : null}
      pageButtonType={PageButtonType.ProductManagement}
      targetPage="/seller/product-management"
    />
  );
}
