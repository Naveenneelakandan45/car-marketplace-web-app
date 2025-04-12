import React from "react";

const CarNewsCard = ({ img, desc }) => {
  return (
    <div className="w-full border-2 border-secondary rounded-md cursor-pointer">
      <img src={img} alt="Car News" className="w-full h-60 object-cover rounded-md" />
      <h3 className="font-semibold text-lg p-4">{desc}</h3>
    </div>
  );
};

export default CarNewsCard;
