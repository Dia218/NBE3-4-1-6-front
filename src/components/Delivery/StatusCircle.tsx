// src/components/Delivery/StatusCircle.tsx
'use client';

import React from 'react';
import { OrderStatus } from '@/lib/types/OrderStatusDTO';

interface StatusCircleProps {
    status: OrderStatus;
    currentStatus: OrderStatus;
}

const StatusCircle: React.FC<StatusCircleProps> = ({ status, currentStatus }) => {
    const isActive = status === currentStatus;

    const circleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isActive ? '#0d6efd' : '#f8f9fa',
        color: isActive ? 'white' : 'black',
        fontWeight: 'bold'
    };

    return (
        <div style={circleStyle}>
            {status}
        </div>
    );
};

export default StatusCircle;