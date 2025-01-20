'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout/PageLayout';
import ListLayout from '../../../components/ListLayout/ListLayout';
import { getProducts } from '../../../lib/api/sellerProductService';
import { ProductDTO } from '../../../lib/types/ProductDTO';
import { PageButtonType } from '@/lib/enum/PageButtonType';
import ProductRequestLayout from '@/components/ProductRequestLayout/ProductRequestLayout';
import { SideButtonType } from '@/lib/enum/SideButtonType';

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); // 백엔드에서 ProductDTO 가져오기
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null); // 선택된 상품 정보 관리
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // 사이드바 표시 여부

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    // 상품 등록/수정 후 목록 갱신
    const handleProductChange = () => {
      fetchProducts(); // 상품 변경 후 목록 갱신
    };
  
    // 상품 삭제 후 목록 갱신
    const handleDeleteProduct = () => {
      fetchProducts(); // 상품 삭제 후 목록 갱신
    };

  // sideButtonType 클릭 시 동작
  const handleSideButtonClick = () => {
    setSelectedProduct(null); // 새 상품 추가
    setIsSidebarVisible(true); // 사이드바 열기
  };

  // 상품 클릭 시 사이드바 열기
  const handleProductClick = (product: ProductDTO | null) => {
    setSelectedProduct(product); // 선택된 상품을 설정
    setIsSidebarVisible(true); // 사이드바 열기
  };

  // 외부 클릭 이벤트 처리
  const handleOutsideClick = (e: MouseEvent) => {
    const sidebar = document.querySelector('.sidebar');
    if (
      isSidebarVisible &&
      sidebar &&
      !sidebar.contains(e.target as Node)
    ) {
      setIsSidebarVisible(false); // 사이드바 숨기기
      setSelectedProduct(null); // 선택된 상품 초기화
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
    <PageLayout
      mainContent={
        <ListLayout
          products={products}
          setSelectedProduct={handleProductClick} // 상품 클릭 시 selectedProduct 설정
        />
      }
      sidebarContent={
        isSidebarVisible && ( // 사이드바 표시 여부에 따라 렌더링
          <div className="sidebar">
            <ProductRequestLayout product={selectedProduct} 
              onProductChange={handleProductChange} // 상품 변경 후 목록 갱신
              onDelete={handleDeleteProduct} // 상품 삭제 후 목록 갱신
            />
          </div>
        )
      }
      pageButtonType={PageButtonType.OrderManagement} // 전달된 페이지 버튼 타입
      targetPage="/seller/order-management" // targetPage 경로 지정
      sideButtonType={SideButtonType.NewProduct} // 상품 추가 버튼
      sideButtonAction={handleSideButtonClick} // sideButtonType 클릭 시 핸들러 연결
    />
  );
};

export default ProductManagementPage;
