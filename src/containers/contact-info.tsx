import { FC } from "react";
import { IoMail, IoCallSharp } from "react-icons/io5";
import Link from "@components/ui/link";

const data = [
  {
    id: 2,
    slug: "/",
    icon: <IoMail />,
    name: "Email",
    description: "support@cropoffs.com",
  },
  {
    id: 3,
    slug: "/",
    icon: <IoCallSharp />,
    name: "Phone",
    description: "+ 91 635-136-1244",
  },
];
interface Props {
  image?: HTMLImageElement;
}
const ContactInfoBlock: FC<Props> = () => {
  return (
    <div className="mb-6 lg:border lg:rounded-md border-gray-300 lg:p-7">
      <h4 className="text-2xl md:text-lg font-bold text-heading pb-7 md:pb-10 lg:pb-6 -mt-1">
        {"Find us here"}
      </h4>
      {data?.map((item: any) => (
        <div key={`contact--key${item.id}`} className="flex pb-7">
          <div className="flex flex-shrink-0 justify-center items-center p-1.5 border rounded-md border-gray-300 w-10 h-10">
            {item.icon}
          </div>
          <div className="flex flex-col ps-3 2xl:ps-4">
            <h5 className="text-sm font-bold text-heading">{`${item.name}`}</h5>
            <Link href={item.slug} className="text-sm mt-0">
              {`${item.description}`}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfoBlock;
