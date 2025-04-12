import React from "react";
import WhyUsCard from "./WhyUsCard";
import { SiWebmoney } from "react-icons/si";
import { FaUsers, FaShippingFast } from "react-icons/fa";

const WhyUs = () => {
  const icon1 = <SiWebmoney className=" text-green-500 mx-auto" size={48} />;
  const icon2 = <FaUsers className=" text-green-500 mx-auto" size={48} />;
  const icon3 = (
    <FaShippingFast className=" text-green-500 mx-auto" size={48} />
  );

  return (
    <div className="ml-36 flex flex-col justify-center container md:mt-16 py-10">
      <h1 className=" font-bold text-4xl text-center">
        Why choose <span className=" text-orange-600">WheelsDeal </span>?
      </h1>

      <p className=" text-center font-medium">
      Our platform ensures transparency, competitive pricing, and a hassle-free process to find your perfect ride!
      </p>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        <WhyUsCard icon={icon1} title="Financing Options" />
        <WhyUsCard icon={icon2} title="Satisfied Customers" />
        <WhyUsCard icon={icon3} title="Fast & Easy Booking" />
      </div>
    </div>
  );
};

export default WhyUs;
