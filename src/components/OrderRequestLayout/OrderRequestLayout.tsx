"use client"

import styles from './OrderRequestLayout.module.css';
import { submitOrder } from "@/lib/api/buyerOrderService";
import { OrderRequestDTO } from "@/lib/types/OrderRequestDTO";

export default function OrderRequestComponent (
    { totalPrice } : { totalPrice: number }
) {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        if (form.email.value.length ==0){
            alert("이메일을 입력해 주세요.");
            form.email.focus();
            return;
        }

        if (form.baseAddress.value.length ==0){
            alert("기본 주소를 입력해 주세요.");
            form.baseAddress.focus();
            return;
        }

        if (form.detailAddress.value.length ==0){
            alert("상세 주소를 입력해 주세요.");
            form.detailAddress.focus();
            return;
        }

        if (form.zipCode.value.length ==0){
            alert("우편 번호를 입력해 주세요.");
            form.zipCode.focus();
            return;
        }

        const formData : OrderRequestDTO = {
            email: form.email.value,
            baseAddress: form.baseAddress.value,
            detailAddress: form.detailAddress.value,
            zipCode: form.zipCode.value,
            totalPrice: form.totalPrice.value
        };

        // fetch 전송 (아래의 코드 api로 분리 가능)
        await submitOrder(formData);
        
    }

    return (
        <div className={styles.container}>
          <div className={styles.formWrapper}>
            <h2 className={styles.title}>결제 정보</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  required
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="baseAddress">기본 주소</label>
                <input
                  type="text"
                  id="baseAddress"
                  name="baseAddress"
                  placeholder="기본 주소를 입력해주세요"
                  required
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="detailAddress">상세 주소</label>
                <input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  placeholder="상세 주소를 입력해주세요"
                  required
                  className={styles.input}
                />
              </div>
    
              <div className={styles.inputGroup}>
                <label htmlFor="zipCode">우편번호</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="우편번호를 입력해주세요"
                  required
                  className={styles.input}
                />
              </div>
    
              <input type="hidden" name="totalPrice" value={totalPrice} />
              
              <div className={styles.totalPrice}>
                <span>총 결제금액 : </span>
                <strong>{totalPrice ? totalPrice: 0}원</strong>
              </div>
    
              <button type="submit" className={styles.submitButton}>
                결제하기
              </button>
            </form>
          </div>
        </div>
      );
};
