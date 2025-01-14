import React, { useState, useEffect } from 'react';
import styles from './ProductBoxOption.module.css'; // Module CSS for scoped styles

interface ProductBoxOptionProps {
  pageType: 'AddCart' | 'ChangeCart' | 'Default';
  initialQuantity?: number;
}

const ProductBoxOption: React.FC<ProductBoxOptionProps> = ({ pageType, initialQuantity = 1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Minimum quantity is 1
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (pageType === 'ChangeCart') {
      setQuantity(initialQuantity);
    }
  }, [pageType, initialQuantity]);

  const renderOptions = () => {
    switch (pageType) {
      case 'AddCart':
        return (
          <div className={styles.buttonsContainer}>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button className={styles.addButton}>장바구니 추가</button>
          </div>
        );

      case 'ChangeCart':
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