import Container from "@components/ui/container";
import { siteSettings } from "@settings/site-settings";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  return (
    <div className="border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container className="flex flex-col-reverse md:flex-row text-center md:justify-between">
        <p className="text-body text-xs lg:text-sm leading-6">
          {"Copyright"} &copy; {year}&nbsp;
          <a
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
            href={siteSettings.author.websiteUrl}
          >
            {siteSettings.author.name}
          </a>
          &nbsp; {"All Rights Reserved"}
        </p>

        {payment && (
          <ul className="hidden md:flex flex-wrap justify-center items-center space-s-4 xs:space-s-5 lg:space-s-7 mb-1 md:mb-0 mx-auto md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 md:mb-0 transition hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <img
                  src={item.image}
                  alt={`${item.name}`}
                  height={item.height}
                  width={item.width}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Copyright;
