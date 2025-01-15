'use client';

import React from 'react';
import PageLayout from '@/components/PageLayout/PageLayout';
import ListLayout from '@/components/ListLayout/ListLayout';
import Summary from '@/components/Summary/Summary';
import styles from './OrderManagement.module.css';

interface OrderGroup {
  email: string;
  orderDate: string;
  items: {
    productId: number;
    productName: string;
    productDescription: string;
    productPrice: number;
    productImageURL: string;
    productStock: number;
    quantity: number;
  }[];
  totalAmount: number;
}

export default function OrderManagementPage() {
  const orders: OrderGroup[] = [
    {
      email: "example@gmail.com",
      orderDate: "12.24 18:23",
      items: [
        {
          productId: 1,
          productName: "Columbia Nariñó",
          productDescription: "커피콩",
          productPrice: 5000,
          productImageURL: "/coffee-sample.jpg",
          productStock: 100,
          quantity: 2
        }
      ],
      totalAmount: 5000
    },
    {
      email: "example2@gmail.com",
      orderDate: "12.24 18:23",
      items: [
        {
          productId: 2,
          productName: "Columbia Nariñó",
          productDescription: "커피콩",
          productPrice: 5000,
          productImageURL: "/coffee-sample.jpg",
          productStock: 100,
          quantity: 2
        },
        {
          productId: 3,
          productName: "Columbia Nariñó",
          productDescription: "커피콩",
          productPrice: 5000,
          productImageURL: "/coffee-sample.jpg",
          productStock: 100,
          quantity: 2
        }
      ],
      totalAmount: 30000
    }
  ];

  return (
    <PageLayout>
      <div className={styles.header}>
        <button className={styles.managementButton}>
          상품 관리
        </button>
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.mainContent}>
          <div className={styles.container}>
            {orders.map((order, index) => (
              <div key={index} className={styles.orderGroup}>
                <div className={styles.orderHeader}>
                  <p>{order.email}</p>
                  <p>{order.orderDate} 배송 준비중</p>
                </div>
                <ListLayout 
                  products={order.items.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    productDescription: item.productDescription,
                    productPrice: item.productPrice,
                    productImageURL: item.productImageURL,
                    productStock: item.productStock
                  }))}
                />
                <div className={styles.totalAmount}>
                  <p>합계 {order.totalAmount}원</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.sidebar}>
          <Summary 
            email="example@gmail.com"
            address="서울시 강남구 강남대로"
            orderNumber="00000"
          />
        </div>
      </div>
    </PageLayout>
  );
}
