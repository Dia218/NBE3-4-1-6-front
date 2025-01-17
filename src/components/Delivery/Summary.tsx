// src/components/Delivery/Summary.tsx
'use client';

import React from 'react';

const Summary: React.FC = () => {
    return (
        <div className="summary-section">
            <h2>Summary</h2>
            <hr />
            
            {/* 
              매일 오후 2시 이전 주문 건에 대한 
              배송 취소 가능 시간 안내 메시지 
            */}
            <p>
                매일 오후 2시 이전에 주문한 당일 배송 상품은 
                배송 시작 시간 1시간 전(오후 1시)까지 취소가 가능합니다.
            </p>
        </div>
    );
};

export default Summary;