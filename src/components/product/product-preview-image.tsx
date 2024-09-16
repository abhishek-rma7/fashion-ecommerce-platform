import Modal from "@components/common/modal/modal";
import React, { useState } from "react";

const ProductImage = ({ url }: { url: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={url}
        className="h-48 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={url} className="cursor-pointer object-contain" />
      </Modal>
    </>
  );
};

export default ProductImage;
