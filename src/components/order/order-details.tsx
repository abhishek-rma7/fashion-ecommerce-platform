import usePrice from "@framework/product/use-price";
import { Item, Order } from "@framework/types";

const OrderItemCard = ({ product }: { product: Item }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity!,
    currencyCode: "INR",
  });
  return (
    <tr
      className="border-b font-normal border-gray-300 last:border-b-0"
      key={product._id}
    >
      <td className="p-4">
        {product.name}, {product.attributes.color} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string; order: Order }> = ({
  className = "pt-10 lg:pt-12",
  order,
}) => {
  const { price: total } = usePrice(
    order && {
      amount: order.total,
      currencyCode: "INR",
    }
  );
  const { price: subTotal } = usePrice(
    order && {
      amount: order.subTotal,
      currencyCode: "INR",
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.shipping,
      currencyCode: "INR",
    }
  );

  return (
    <div className={className}>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {"Order Details"}:
      </h2>
      <table className="w-full text-heading font-semibold text-sm lg:text-base">
        <thead>
          <tr>
            <th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
              {"Product"}
            </th>
            <th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
              {"Total"}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.items.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          {order?.coupon ? (
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{"Coupon"}:</td>
              <td className="p-4">{order.coupon}</td>
            </tr>
          ) : (
            ""
          )}

          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{"Sub-total"}:</td>
            <td className="p-4">{subTotal}</td>
          </tr>
          {order.discount > 0 ? (
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{"Discount"}:</td>
              <td className="p-4">₹{order.discount}</td>
            </tr>
          ) : (
            ""
          )}
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{"Shipping"}:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ps-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{"Payment method"}:</td>
            <td className="p-4">
              {order.paymentType === "Prepaid"
                ? order?.payment?.method
                : "Cash on Delivery"}
            </td>
          </tr>
          {order.paymentType === "Prepaid" && (
            <tr className="odd:bg-gray-150">
              <td className="p-4 italic">{"Payment Status"}:</td>
              <td className="p-4">{order?.payment?.status}</td>
            </tr>
          )}
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{"Total"}:</td>
            <td className="p-4">{total}</td>
          </tr>
          <tr className="odd:bg-gray-150">
            <td className="p-4 italic">{"Note"}:</td>
            <td className="p-4">new order</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
