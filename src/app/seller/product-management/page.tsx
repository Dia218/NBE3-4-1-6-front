'use client';

import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout/PageLayout'; // Import PageLayout
import ListLayout from '../../../components/ListLayout/ListLayout';
import { getProducts } from '../../../lib/api/sellerProductService';
import { ProductDTO } from '../../../lib/types/ProductDTO';
import { PageButtonType } from '@/lib/enum/PageButtonType';
import ProductRequestLayout from '@/components/ProductRequestLayout/ProductRequestLayout';

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<ProductDTO[]>([]); // 백엔드에서 ProductDTO 가져오기
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(null); // 선택된 상품 정보 관리

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

  // 상품 클릭 시 사이드바 열기
  const handleProductClick = (product: ProductDTO | null) => {
    setSelectedProduct(product); // 선택된 상품을 설정하여 사이드바를 염
  };

  // 외부 영역 클릭 시 사이드바 닫기
  const handleBodyClick = (e: React.MouseEvent) => {
    // 사이드바와 ListLayout 영역 외부 클릭 시에만 동작
    if (selectedProduct && !(e.target instanceof HTMLElement && e.target.closest('.sidebar'))) {
      setSelectedProduct(null); // 사이드바를 숨기기 위해 selectedProduct를 null로 설정
    }
  };

  return (
    <PageLayout 
      mainContent={
        <div onClick={handleBodyClick}> {/* 외부 클릭 시 사이드바 숨기기 */}
          <ListLayout 
            products={products} 
            setSelectedProduct={handleProductClick} // 상품 클릭 시 selectedProduct 설정
          />
        </div>
      }
      sidebarContent={
        selectedProduct ? <ProductRequestLayout product={selectedProduct} /> : null // 상품이 선택되었을 때만 사이드바 표시
      }
      pageButtonType={PageButtonType.OrderManagement} // 전달된 페이지 버튼 타입
      targetPage="/seller/order-management" // targetPage 경로 지정
    />
  );
};

export default ProductManagementPage;
