import React from "react";

const WhyUsCard = ({ icon, title }) => {

  const getDescription = (title) => {
    switch (title) {
      case "Financing Options":
        return "We provide flexible financing solutions tailored to your needs, making car ownership more accessible. Whether you prefer low-interest loans or easy EMI plans, WheelsDeal partners with top financial institutions to offer the best deals.";
      case "Satisfied Customers":
        return "Thousands of happy customers trust WheelsDeal for their car-buying journey. With our user-friendly interface and quick booking process, you can find, negotiate, and secure your dream car effortlessly.";
      case "Fast & Easy Booking":
        return "WheelsDeal simplifies the car-buying process with a fast and easy booking system. Our seamless interface ensures you can browse, book, and drive away with your dream car in just a few clicks.";
      default:
        return "WheelsDeal offers a seamless and trustworthy car-buying experience, connecting buyers and sellers with ease.";
    }
  };

  return (
    <div className="text-center p-8 space-y-4 bg-slate-100 hover:bg-secondary hover:text-blue-500 transition duration-200 ease-in-out rounded-md cursor-pointer">
      {icon}
      <h1 className="text-primary text-3xl font-bold">{title}</h1>
      <p className="text-sm">{getDescription(title)}</p>
    </div>
  );
};

export default WhyUsCard;
