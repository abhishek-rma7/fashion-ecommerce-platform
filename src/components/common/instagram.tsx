import Image from "next/image";
import cn from "classnames";

const instagramFeed = [
  {
    id: 1,
    title: "text-man",
    // slug: "/#",
    image: "https://www.instagram.com/p/Cni-xA-oMOh/",
  },
  {
    id: 2,
    title: "text-woman",
    // slug: "/#",
    image: "https://www.instagram.com/p/Cm_4Q6WIgxj/",
  },
  {
    id: 3,
    title: "text-watch",
    // slug: "/#",
    image: "https://www.instagram.com/p/CfNtcy3jzEs/",
  },
  {
    id: 4,
    title: "text-man",
    // slug: "/#",
    image: "https://www.instagram.com/p/CkiT6ugp2GW/",
  },
];

interface Props {
  className?: string;
}
const Instagram: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className="pt-16">
      <div className="text-center text-black my-8">
        <p className="text-xl font-semibold gradiant-text">
          Love it ? Flaunt It!
        </p>
        <h2 className="text-4xl font-bold uppercase">Follow us on instagram</h2>
      </div>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-0.5 sm:gap-1 overflow-hidden rounded-md my-10",
          className
        )}
      >
        {instagramFeed?.map((item) => (
          <a
            className="group flex justify-center text-center relative"
            href={item.image}
            key={`instagram--key${item.id}`}
            target="_blank"
          >
            <Image
              src={
                `${item.image}media/?size=l` ??
                "/assets/placeholder/instagram.svg"
              }
              alt={`${item.title}` || "text-instagram-thumbnail"}
              width={500}
              height={500}
              className="bg-gray-300 object-cover"
            />
            <div className="absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
            <div className="absolute top left h-full w-full flex items-center justify-center">
              <Image
                src={"/assets/images/instagram.png"}
                width={52}
                height={52}
                className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Instagram;
