import React from 'react';
import ProductBoxBase from '../ProductBox/ProductBoxBase';
import { ProductDTO } from '../../lib/types/ProductDTO';
import { PageType } from '../../lib/enum/PageType';
import styles from './ListLayout.module.css';

interface ListLayoutProps {
  pageType?: PageType;
  products: ProductDTO[];
}

const ListLayout: React.FC<ListLayoutProps> = ({ pageType = PageType.Default, products }) => {
  return (
    <div className={styles.listLayout}>
      {products.map((product) => (
        <ProductBoxBase
          key={product.productId}
          image={product.productImageURL}
          name={product.productName}
          description={product.productDescription}
          price={product.productPrice.toString()} // String으로 변환
          additionalContent={pageType} />
      ))}
    </div>
  );
};

export default ListLayout;