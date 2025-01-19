import Summary from "@/components/Summary/Summary";

interface OrderSummaryProps {
  email: string;
  address: string;
  orderNumber: string;
}

const OrderSummary = ({ email, address, orderNumber }: OrderSummaryProps) => {
  return (
    <div className="summaryContainer">
      <Summary
        selectedOrder={{
          customerEmail: email,
          address,
          orderId: orderNumber,
          hasGuidingText: true
        }}
      />
    </div>
  );
};

export default OrderSummary;
