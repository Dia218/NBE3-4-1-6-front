'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout/PageLayout'; // Import PageLayout
import ListLayout from '../../../components/ListLayout/ListLayout';
import { getProducts } from '../../../lib/api/sellerProductService';
import { ProductDTO } from '../../../lib/types/ProductDTO';
import ClientProductRequestLayout from './clientProductRequestLayout';
import styles from './ProductManagementPage.module.css'; // CSS 모듈 가져오기

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); //백엔드에서 ProductDTO 가져오기

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.pageLayout}>
        <PageLayout mainContent={<ListLayout products={products} />} />
      </div>
      <div className={styles.clientProductRequestLayout}>
        <ClientProductRequestLayout />
      </div>
    </div>
  );
};

export default ProductManagementPage;
