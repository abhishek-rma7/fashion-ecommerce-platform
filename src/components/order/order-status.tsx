import ProgressCard from "@components/common/progress-card";
import React from "react";

const OrderStatus = ({ orderStatus }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {"Order Status"}: {orderStatus}
      </h2>
      <ProgressCard orderStatus={orderStatus} />
    </div>
  );
};

export default OrderStatus;
