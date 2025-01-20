import React, { useState, useEffect } from 'react';
import styles from './ProductBoxOption.module.css';
import { PageType } from '../../lib/enum/PageType';
import { addToCart } from '@/lib/api/buyerProductService';

interface ProductBoxOptionProps {
  id: number;
  pageType: PageType;
}

const ProductBoxOption: React.FC<ProductBoxOptionProps> = ({ id, pageType }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Minimum quantity is 1
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    console.log(id, quantity);
    await addToCart(id, quantity);
  }

  const renderOptions = () => {
    switch (pageType) {
      case PageType.AddCart:
        return (
          <div className={styles.buttonsContainer}>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button onClick={handleAddToCart} className={styles.addButton}>장바구니 추가</button>
          </div>
        );

      case PageType.ChangeCart:
        return (
          <div className={styles.buttonsContainer}>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button className={styles.addButton}>적용</button>
            <button className={styles.deleteButton}>삭제</button>
          </div>
        );

      default:
        return (
          <div className={styles.buttonsContainer}>
            <div className={styles.quantityBox}>{quantity}</div>
          </div>
        );
    }
  };

  return <div>{renderOptions()}</div>;
};

export default ProductBoxOption;