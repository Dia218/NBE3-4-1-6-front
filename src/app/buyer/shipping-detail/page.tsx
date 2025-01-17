// src/app/shipping-detail/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { DeliveryDTO } from '@/lib/types/DeliveryDTO';
import { OrderStatus } from '@/lib/types/OrderStatusDTO';
import StatusCircle from '@/components/Delivery/StatusCircle';
import DeliveryInfo from '@/components/Delivery/DeliveryInfo';
import Summary from '@/components/Delivery/Summary';

// 배송 정보 조회를 위한 API service를 나중에 추가할 예정
// import { deliveryService } from '@/lib/api/deliveryService'; 

const ShippingDetailPage = () => {
    // 배송 정보 상태 관리
    const [delivery, setDelivery] = useState<DeliveryDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // 컴포넌트 마운트 시 배송 정보 조회
    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                // API 연동 전 임시 데이터
                const mockDelivery = {
                    deliveryId: 1,
                    deliveryNumber: "123456789",
                    deliveryCompany: "Grid 택배",
                    orderId: 1,
                    order: {
                        orderId: 1,
                        orderStatus: OrderStatus.PREPARING
                    }
                };
                
                //setDelivery(mockDelivery);
                setLoading(false);
            } catch (err) {
                setError('배송 정보를 불러오는데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchDelivery();
    }, []);

    // 로딩 상태 처리
    if (loading) {
        return <div className="text-center mt-5">로딩 중...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    // 데이터가 없는 경우 처리
    if (!delivery) {
        return <div className="text-center mt-5">배송 정보가 없습니다.</div>;
    }

    // 메인 렌더링
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Grids & Circle</h1>

            <div className="row">
                {/* 배송 상태 및 정보 영역 */}
                <div className="col-lg-8">
                    {/* 배송 상태 원형 표시 영역 */}
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                        <StatusCircle 
                            status={OrderStatus.ORDERED}
                            currentStatus={delivery.order.orderStatus}
                        />
                        <div>...</div>
                        <StatusCircle 
                            status={OrderStatus.PREPARING}
                            currentStatus={delivery.order.orderStatus}
                        />
                        <div>...</div>
                        <StatusCircle 
                            status={OrderStatus.DELIVERED}
                            currentStatus={delivery.order.orderStatus}
                        />
                    </div>

                    {/* 배송 정보 표시 */}
                    <DeliveryInfo delivery={delivery} />
                </div>

                {/* Summary 영역 */}
                <div className="col-lg-4">
                    <Summary />
                </div>
            </div>
        </div>
    );
};

export default ShippingDetailPage;