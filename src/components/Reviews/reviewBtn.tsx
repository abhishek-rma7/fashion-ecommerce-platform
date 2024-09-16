import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import React from "react";

const ReviewBtn = () => {
  const { setModalView, openModal } = useUI();
  const handleOpen = () => {
    setModalView("REVIEW_FORM");
    openModal();
  };
  return (
    <Button className="w-full" onClick={handleOpen}>
      Write a review
    </Button>
  );
};

export default ReviewBtn;
