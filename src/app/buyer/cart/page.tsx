'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '@/components/PageLayout/PageLayout'; // Import PageLayout
import ListLayout from '@/components/ListLayout/ListLayout';
import { getCartList } from '@/lib/api/buyerProductService';
import { ProductDTO } from '@/lib/types/ProductDTO';
import styles from './CartPage.module.css'; // CSS 모듈 가져오기
import { PageType } from '@/lib/enum/PageType';
import OrderRequestComponent from '@/components/OrderRequestLayout/OrderRequestLayout';
import { SideButtonType } from '@/lib/enum/SideButtonType';
import { PageButtonType } from '@/lib/enum/PageButtonType';

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); //백엔드에서 ProductDTO 가져오기
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 사이드바 표시 여부
  const [totalPrice, setTotalPrice] = useState<number>(0); // 총 결제 금액 상태 추가

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getCartList();
        setProducts(fetchedProducts);
        console.log('fetchedProducts:', fetchedProducts);

        // 총 결제 금액 계산
        const calculatedTotalPrice = fetchedProducts.reduce(
          (sum, product) => sum + product.productPrice * (product.productStock || 1),
          0
        );
        setTotalPrice(calculatedTotalPrice);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // sideButton 클릭 시 동작
  function handleSideButtonClick(): void {
    setIsSidebarVisible(true); // 사이드바 열기
  }

    // 외부 클릭 이벤트 처리
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebar = document.querySelector('.sidebar');
      if (
        isSidebarVisible &&
        sidebar &&
        !sidebar.contains(e.target as Node)
      ) {
        setIsSidebarVisible(false); // 사이드바 숨기기
      }
    };

      useEffect(() => {
        if (isSidebarVisible) {
          document.addEventListener('click', handleOutsideClick);
        } else {
          document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
          document.removeEventListener('click', handleOutsideClick);
        };
      }, [isSidebarVisible]);

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
          sidebarContent={
            isSidebarVisible && ( // 사이드바 표시 여부에 따라 렌더링
              <div className="sidebar">
                <OrderRequestComponent totalPrice={totalPrice} // 상품 삭제 후 목록 갱신
                />
              </div>
            )
          }
          pageButtonType={PageButtonType.ProductList} // 전달된 페이지 버튼 타입
          targetPage="/buyer/product-list" // targetPage 경로 지정
          sideButtonType={SideButtonType.Payment} // 결제 사이드바 버튼
          sideButtonAction={handleSideButtonClick} // sideButtonType 클릭 시 핸들러 연결
        />
      </div>
    </div>
  );
};

export default CartPage;