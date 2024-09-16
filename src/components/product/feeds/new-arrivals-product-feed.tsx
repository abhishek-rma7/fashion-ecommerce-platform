import ProductsBlock from "@containers/products-block";
import { useProductsQuery } from "@framework/product/get-all-products";

export default function NewArrivalsProductFeed() {
  const { data, isLoading, error } = useProductsQuery({
    limit: 8,
    sort: "-createdAt",
    fields:
      "name slug stock price salePrice image shortDetail variations discount",
  });

  return (
    <ProductsBlock
      sectionHeading="New Arrivals"
      products={data?.products}
      loading={isLoading}
      error={(error as any)?.message}
      uniqueKey="new-arrivals"
    />
  );
}
