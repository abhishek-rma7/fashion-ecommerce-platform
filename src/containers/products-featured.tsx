import ProductOverlayCard from "@components/product/product-overlay-card";
import Alert from "@components/ui/alert";
import { useProductsQuery } from "@framework/product/get-all-products";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  limit?: number;
  variant?: "left" | "center" | "combined";
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
  variant = "left",
  limit = 5,
}) => {
  const { data, error } = useProductsQuery({
    limit: limit,
    featured: true,
    fields: "name slug stock price salePrice image shortDetail variations",
  });

  return (
    <div className={className}>
      <div className="text-center text-black my-8">
        <p className="text-xl font-semibold text-gray-800">Carry Your Style</p>
        <h2 className="text-4xl font-bold uppercase">Featured Products</h2>
      </div>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 gap-3 md:gap-5 xl:gap-7">
          {data?.products.map((product, idx: number) => (
            <ProductOverlayCard
              key={`product--key${product._id}`}
              product={product}
              variant={variant}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsFeatured;
