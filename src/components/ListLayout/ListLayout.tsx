import React from 'react';
import ProductBoxBase from '../ProductBox/ProductBoxBase';
import { ProductDTO } from '../../lib/types/ProductDTO';
import { PageType } from '../../lib/enum/PageType';
import styles from './ListLayout.module.css';

interface ListLayoutProps {
  pageType?: PageType;
  products: ProductDTO[];
  setSelectedProduct?: (product: ProductDTO | null) => void; // 상위 컴포넌트로 선택된 상품을 전달하는 함수
}

const ListLayout: React.FC<ListLayoutProps> = ({ pageType = PageType.Default, products, setSelectedProduct }) => {

  const handleProductClick = (product: ProductDTO) => {
    if (setSelectedProduct) {
      setSelectedProduct(product); // setSelectedProduct가 있을 때만 호출
    }
  };

  return (
    <div className={styles.listLayout}>
      {products.map((product) => (
        <div key={product.productId} onClick={() => handleProductClick(product)}>
          <ProductBoxBase
            id = {product.productId}
            image={product.productImageURL}
            name={product.productName}
            description={product.productDescription}
            price={product.productPrice.toString()}
            stock={product.productStock}
            additionalContent={pageType}
          />
        </div>
      ))}
    </div>
  );
};

export default ListLayout;
