interface Props {
  orderStatus: string;
}

const statusBar = [
  {
    img: "https://img.icons8.com/ios-filled/100/000000/verified-account.png",
    text: "Confirmed",
  },
  {
    img: "https://img.icons8.com/ios-filled/100/000000/shipped.png",
    text: "Shipped",
  },
  {
    img: "https://img.icons8.com/ios-filled/100/000000/checked-truck.png",
    text: "Delivered",
  },
];

const ProgressCard: React.FC<Props> = ({ orderStatus }) => {
  const status = {
    Confirmed: 5,
    Shipped: 50,
    Delivered: 100,
  };

  const progressBar = status[orderStatus];
  return (
    <div>
      <div className="flex justify-between items-center mb-2.5 md:mb-3 xl:mb-2.5 2xl:mb-4">
        {statusBar.map((item, idx) => {
          return (
            <div
              className="text-body text-xs md:text-base lg:text-lg leading-6 md:leading-7 flex flex-col items-center"
              key={idx}
            >
              <img
                src={item.img}
                className="w-[24px] md:w-[36px] lg:w-[48px]"
              />
              <span className="text-heading">{item.text}</span>
            </div>
          );
        })}
      </div>
      <div className="relative w-full h-2.5 lg:h-3 2xl:h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-indigo-600"
          style={{
            width: `${Math.round(progressBar)}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
