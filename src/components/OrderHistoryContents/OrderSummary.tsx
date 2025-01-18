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
        email={email}
        address={address}
        orderNumber={orderNumber}
        hasGuidingText={true}
      />
    </div>
  );
};

export default OrderSummary;
