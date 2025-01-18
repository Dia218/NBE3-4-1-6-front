'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout'; // Import PageLayout
import ListLayout from '@/components/ListLayout/ListLayout';
import { getCartList } from '@/lib/api/buyerProductService';
import { ProductDTO } from '@/lib/types/ProductDTO';
import styles from './CartPage.module.css'; // CSS 모듈 가져오기
import { PageType } from '@/lib/enum/PageType';
import { PageButtonType } from '@/lib/enum/PageButtonType';

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); //백엔드에서 ProductDTO 가져오기

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getCartList();
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
        <PageLayout 
          mainContent={
            <ListLayout 
              pageType={PageType.ChangeCart}
              products={products} 
            />
          } 
          //sidebarContent= 결제 모듈
          pageButtonType={PageButtonType.ProductList} // 전달된 페이지 버튼 타입
          targetPage="/buyer/product-list" // targetPage 경로 지정
        />
      </div>
    </div>
  );
};

export default CartPage;