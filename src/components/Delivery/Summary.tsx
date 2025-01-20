import React from "react";

interface SummaryProps {
  children?: React.ReactNode;
}

export const Summary: React.FC<SummaryProps> = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg space-y-4">
      {children}
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">배송 안내</h3>
        <p className="text-gray-600 text-sm">
          매일 오후 2시 이전에 주문한 당일 배송 상품은 배송 시작 시간 1시간
          전(오후 1시)까지 취소가 가능합니다.
        </p>
      </div>
    </div>
  );
};
