import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewBtn from "@components/Reviews/reviewBtn";

interface Props {
  data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState<number>(0);

  if (data?.meta.length === 2) {
    data?.meta.push({
      title: "Write a review",
      content: (
        <div className="space-y-3">
          <p className="mb-4 text-lg">
            Write about your experience with this product.
          </p>
          <ReviewBtn />
        </div>
      ),
    });
  }
  return (
    <>
      {data?.meta.map((item: any, index: any) => (
        <Collapse
          i={index}
          key={item.title}
          title={item.title}
          translatorNS="review"
          content={
            index === 2 ? (
              item.content
            ) : (
              <ul className="text-body text-sm lg:text-base leading-6 lg:leading-8">
                {item?.content?.split(";").map((desc, idx) => {
                  return <li key={idx}>{desc}</li>;
                })}
              </ul>
            )
          }
          expanded={expanded}
          setExpanded={setExpanded}
          variant="transparent"
        />
      ))}
    </>
  );
};

export default ProductMetaReview;
