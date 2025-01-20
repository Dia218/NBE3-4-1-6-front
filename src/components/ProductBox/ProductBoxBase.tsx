import React from 'react';
import styles from './ProductBoxBase.module.css';
import { PageType } from '../../lib/enum/PageType';
import ProductBoxOption from './ProductBoxOption';

interface ProductBoxBaseProps {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  additionalContent: PageType; // ProductBoxOption
  cartQuantity?: number;
  stock: number;
}

const ProductBoxBase: React.FC<ProductBoxBaseProps> = ({
  id,
  image,
  name,
  description,
  price,
  additionalContent,
  cartQuantity,
  stock
}) => {
  return (
    <div className={styles.productBox}>
      <div className={styles.productImageContainer}>
        <img
          src={image}
          alt={name}
          className={styles.productImage}
          width={100}
          height={100}
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDescription}>{description}</p>
      </div>
      <div className={styles.productPrice}>
        <p>{price}</p>
      </div>
      <div>
        {additionalContent && <ProductBoxOption id={id} stock={stock} pageType={additionalContent} />}
      </div>
    </div>
  );
};

export default ProductBoxBase;