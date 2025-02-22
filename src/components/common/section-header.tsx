import Text from "@components/ui/text";
import Link from "@components/ui/link";

interface Props {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
}

const SectionHeader: React.FC<Props> = ({
  sectionHeading = "text-section-title",
  categorySlug,
  className = "pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8",
}) => {
  return (
    <div
      className={`flex items-center justify-between -mt-2 lg:-mt-2.5 ${className}`}
    >
      <Text variant="pageHeading" className="text-4xl">
        {" "}
        {`${sectionHeading}`}
      </Text>
      {categorySlug && (
        <Link
          href={categorySlug}
          className="text-xs lg:text-sm xl:text-base text-heading mt-0.5 lg:mt-1"
        >
          {"text-see-all-product"}
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
