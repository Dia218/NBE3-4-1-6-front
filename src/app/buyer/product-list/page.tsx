'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout'; // Import PageLayout
import ListLayout from '@/components/ListLayout/ListLayout';
import { getProducts } from '@/lib/api/sellerProductService';
import { ProductDTO } from '@/lib/types/ProductDTO';
import styles from './ProductListPage.module.css'; // CSS 모듈 가져오기
import { PageType } from '@/lib/enum/PageType';
import { PageButtonType } from '@/lib/enum/PageButtonType';
import { SideButtonType } from '@/lib/enum/SideButtonType';

const ProductListPage: React.FC = () => {
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
        <PageLayout 
          mainContent={
            <ListLayout 
              pageType={PageType.AddCart}
              products={products} setSelectedProduct={function (product: ProductDTO | null): void {
                throw new Error('Function not implemented.');
              } }            />
          }
          pageButtonType={PageButtonType.OrderHistory} // 전달된 페이지 버튼 타입
          targetPage="/buyer/email-input" // targetPage 경로 지정
          sideButtonType={SideButtonType.GoCart} // 장바구니페이지 이동 버튼
          targetEvent="/buyer/cart"
        />
      </div>
    </div>
  );
};

export default ProductListPage;
