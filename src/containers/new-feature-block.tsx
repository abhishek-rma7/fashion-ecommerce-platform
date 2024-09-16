/* This example requires Tailwind CSS v2.0+ */
const incentives = [
  {
    name: "Zero Waste",
    description:
      "We aim at attaining zero wastage by making the most out of every textile scrap.",
    imageSrc:
      "https://ik.imagekit.io/abhishekrma7/5_dRgSg2oF_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660111236925",
  },
  {
    name: "No Plastic",
    description: "We say no to plastic not just on Earth Day but everyday.",
    imageSrc:
      "https://ik.imagekit.io/abhishekrma7/7_iV_BmaP_Q.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660111236924",
  },
  {
    name: "Handmade",
    description:
      "Each item you buy is a creation of love and skill. It is unique & made to last.",
    imageSrc:
      "https://ik.imagekit.io/abhishekrma7/6_2RmTwq4CT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660111236928",
  },
  {
    name: "Recyclable",
    description: "Our minimal packaging is totally recyclable.",
    imageSrc:
      "https://ik.imagekit.io/abhishekrma7/8_zjdmwssng.png?ik-sdk-version=javascript-1.4.3&updatedAt=1660111237154",
  },
];

export default function NewFeatureBlock() {
  return (
    <div className="bg-gray-50">
      <div className="text-center pt-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 font-poppins">
          ACT RESPONSIBLE, THINK SUSTAINABLE
        </h2>
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="flex flex-col items-center justify-center"
            >
              <img src={incentive.imageSrc} alt="" className="h-32 w-auto" />
              <h3 className="mt-6 text-base font-semibold text-green-700 uppercase">
                {incentive.name}
              </h3>
              <p className="mt-2 text-sm text-[rgb(107 114 128)] text-center">
                {incentive.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
