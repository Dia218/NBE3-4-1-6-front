import React, { useState, useEffect } from 'react';
import styles from './ProductBoxOption.module.css';
import { PageType } from '../../lib/enum/PageType';
import { addToCart, removeFromCart, updateCartQuantity } from '@/lib/api/buyerProductService';

interface ProductBoxOptionProps {
  id: number;
  stock: number;
  pageType: PageType;
}

const ProductBoxOption: React.FC<ProductBoxOptionProps> = ({ id, stock, pageType }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Minimum quantity is 1
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    await addToCart(id, quantity);
    alert('장바구니에 추가되었습니다.');
  }

  const handleAdapt = async () => {
    await updateCartQuantity(id, quantity);
    alert('장바구니가 업데이트되었습니다.');
    window.location.href = window.location.href; 
  }

  const handleDelete = async () => {
    await removeFromCart(id);
    alert('장바구니에서 삭제되었습니다.');
    window.location.href = window.location.href; 
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
              defaultValue={stock}
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button onClick={handleAdapt} className={styles.addButton}>적용</button>
            <button onClick={handleDelete} className={styles.deleteButton}>삭제</button>
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