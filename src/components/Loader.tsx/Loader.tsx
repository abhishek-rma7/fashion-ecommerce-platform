import React from "react";

const Loader = () => {
  return (
    <div className="h-screen bg-white">
      <div className="flex justify-center items-center h-full">
        <img
          className="h-16 w-16"
          src="/assets/placeholder/icons8-dots-loading.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default Loader;
