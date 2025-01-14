import React from 'react';
import Image from 'next/image';
import styles from './ProductBoxBase.module.css';

interface ProductBoxBaseProps {
  image: string;
  name: string;
  description: string;
  price: string;
  additionalContent?: React.ReactNode; // ProductBoxOption
}

const ProductBoxBase: React.FC<ProductBoxBaseProps> = ({
  image,
  name,
  description,
  price,
  additionalContent,
}) => {
  return (
    <div className={styles.productBox}>
      <div className={styles.productImageContainer}>
        <Image
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
        {additionalContent && <div className={styles.productAdditional}>{additionalContent}</div>}
      </div>
    </div>
  );
};

export default ProductBoxBase;