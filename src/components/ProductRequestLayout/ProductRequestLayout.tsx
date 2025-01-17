"use client"

import { createProduct, updateProduct } from "@/lib/api/sellerProductService";
import { ProductDTO } from "@/lib/types/ProductDTO";
import styles from './ProductRequestLayout.module.css';
import { ProductRequestDTO } from "@/lib/types/ProductRequestDTO";

function ProductRequestLayout(
    { product } : any
) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        if (form.productName.value.length ==0){
            alert("상품명을 입력해 주세요.");
            form.email.focus();
            return;
        }

        if (form.productDescription.value.length ==0){
            alert("상품 설명을 입력해 주세요.");
            form.baseAddress.focus();
            return;
        }

        if (form.productPrice.value.length ==0){
            alert("상품 가격을 입력해 주세요.");
            form.detailAddress.focus();
            return;
        }

        if (form.productImageURL.value.length ==0){
            alert("상품 이미지 URL를 입력해 주세요.");
            form.zipCode.focus();
            return;
        }

        if (form.productStock.value.length ==0){
            alert("상품 재고 수를 입력해 주세요.");
            form.zipCode.focus();
            return;
        }

        if(product === null) {
          const createFormData : ProductRequestDTO = {
            productName: form.productName.value,
            productDescription: form.productDescription.value,
            productPrice: form.productPrice.value,
            productImageURL: form.productImageURL.value,
            productStock: form.productStock.value
          };
          await createProduct(createFormData);
        } else {
          const updateFormData : ProductDTO = {
            productId: product?.productId,
            productName: form.productName.value,
            productDescription: form.productDescription.value,
            productPrice: form.productPrice.value,
            productImageURL: form.productImageURL.value,
            productStock: form.productStock.value
          };
          await updateProduct(updateFormData);
        }
    }

    return (
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <h2 className={styles.title}>
              {product ? '상품 수정' : '상품 등록'}
            </h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="productName">상품명</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="상품명을 입력해주세요"
                  defaultValue={product ? product.productName : ""}
                  required
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="productDescription">상품 설명</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  placeholder="상품 설명을 입력해주세요"
                  defaultValue={product ? product.productDescription : ""}
                  required
                  className={`${styles.input} ${styles.textarea}`}
                  rows={4}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="productPrice">상품 가격</label>
                <input
                  type="number"
                  id="productPrice"
                  name="productPrice"
                  placeholder="상품 가격을 입력해주세요"
                  defaultValue={product ? product.productPrice : ""}
                  required
                  min="0"
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="productImageURL">이미지 URL</label>
                <input
                  type="text"
                  id="productImageURL"
                  name="productImageURL"
                  placeholder="이미지 URL을 입력해주세요"
                  defaultValue={product ? product.productImageURL : ""}
                  required
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="productStock">재고 수량</label>
                <input
                  type="number"
                  id="productStock"
                  name="productStock"
                  placeholder="상품 재고를 입력해주세요"
                  defaultValue={product ? product.productStock : ""}
                  required
                  min="0"
                  className={styles.input}
                />
              </div>
    
              <button type="submit" className={styles.submitButton}>
                {product ? '수정하기' : '등록하기'}
              </button>
            </form>
          </div>
        </div>
      );
}

export default ProductRequestLayout;