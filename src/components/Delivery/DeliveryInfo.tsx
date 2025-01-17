// src/components/Delivery/DeliveryInfo.tsx
'use client';

import React from 'react';
import { DeliveryDTO } from '@/lib/types/DeliveryDTO';
import { OrderDTO } from '@/lib/types/OrderDTO';

interface DeliveryInfoProps {
    delivery: DeliveryDTO;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ delivery }) => {
    if (!delivery) return null;

    return (
        <div className="delivery-section">
            <h2>배송 상태</h2>
            <hr />
            
            <div className="delivery-info">
                <p><strong>현재 상태:</strong> {delivery.order.orderStatus}</p>
                <p><strong>운송장 번호:</strong> {delivery.deliveryNumber}</p>
                <p><strong>택배사:</strong> {delivery.deliveryCompany}</p>
            </div>
        </div>
    );
};

export default DeliveryInfo;