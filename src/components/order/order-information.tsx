import { IoCheckmarkCircle } from "react-icons/io5";
import OrderDetails from "@components/order/order-details";
import OrderStatus from "./order-status";
import { CheckoutInputType, Order } from "@framework/types";

export default function OrderInformation({
  data,
  total,
}: {
  data: Order;
  total: string;
}) {
  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-gray-300 bg-gray-50 px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-heading text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-green-600" />
        </span>
        {"Order Received"}
      </div>

      <ul className="border border-gray-300 bg-gray-50 rounded-md flex flex-col md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {"Order number"}:
          </span>
          {data?.orderId}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {"Date"}:
          </span>
          {data?.date.split(",")[0]}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {"Time"}:
          </span>
          {data?.date.split(",")[1]}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {"Email"}:
          </span>
          {data?.email}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {"Total"}:
          </span>
          {total}
        </li>
        <li className="text-heading font-semibold text-base lg:text-lg border-b md:border-b-0 md:border-r border-dashed border-gray-300 px-4 lg:px-6 xl:px-8 py-4 md:py-5 lg:py-6 last:border-0">
          <span className="uppercase text-[11px] block text-body font-normal leading-5">
            {data?.paymentType === "Prepaid" ? "Payment ID" : "Payment"}:
          </span>
          {data?.paymentType === "Prepaid" ? data?.payment?.id : "COD"}
        </li>
      </ul>

      <OrderStatus orderStatus={data?.orderStatus} />
      <OrderDetails order={data} />
    </div>
  );
}
