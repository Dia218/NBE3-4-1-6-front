import React from "react";

interface StatusCircleProps {
  currentStatus: string;
}

export const StatusCircle: React.FC<StatusCircleProps> = ({
  currentStatus,
}) => {
  const steps = [
    { status: "ORDERED", label: "주문 완료" },
    { status: "PREPARING", label: "배송 중" },
    { status: "DELIVERED", label: "배송 완료" },
  ];

  const getCurrentStep = () => {
    return steps.findIndex((step) => step.status === currentStatus);
  };

  return (
    <div className="w-full py-8">
      <div className="flex justify-center items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.status}>
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center
                                ${
                                  getCurrentStep() >= index
                                    ? "bg-gray-100"
                                    : "bg-gray-50"
                                }`}
              >
                <span className="text-sm text-gray-600">{step.label}</span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-24 mx-4 
                                ${
                                  getCurrentStep() > index
                                    ? "bg-blue-500"
                                    : "bg-gray-200"
                                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
