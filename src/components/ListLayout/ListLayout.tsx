import React from 'react';
import ProductBoxBase from '../ProductBox/ProductBoxBase';
import { ProductDTO } from '../../lib/types/productDTO';
import styles from './ListLayout.module.css';

interface ListLayoutProps {
  products: ProductDTO[];
}

const ListLayout: React.FC<ListLayoutProps> = ({ products }) => {
  return (
    <div className={styles.listLayout}>
      {products.map((product) => (
        <ProductBoxBase
          key={product.productId}
          image={product.productImageURL}
          name={product.productName}
          description={product.productDescription}
          price={product.productPrice.toString()} // String으로 변환
        />
      ))}
    </div>
  );
};

export default ListLayout;