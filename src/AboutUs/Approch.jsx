import React from "react";
import img from "../../src/assets/img/approch.jpg";

const Approch = () => {
  return (
    <div className=" flex flex-col-reverse justify-center md:flex-row items-center gap-5 mt-14">
      {/* content section  */}
      <div className="w-full md:w-2/4 space-y-4">
        <h1 className=" text-4xl font-bold ">Our <span className="text-orange-700">Approch</span></h1>

        <h2 className=" font-semibold text-lg lg:text-2xl">
          Empower individuals to achieve sustainable mobility solutions and
          inspire a positive impact on the environment.
        </h2>
        <p className=" text-sm lg:text-base">
        AI-driven insights and smart negotiation strategies, we help users make informed choices,
       reducing carbon footprints and promoting responsible vehicle usage.
        </p>
        <p className=" text-sm lg:text-base">
        With data-driven insights and advanced tools, we ensure transparency and fair pricing for all.  
        Our AI-powered system analyzes market trends to offer competitive deals.  
        We prioritize user experience by providing a smooth, hassle-free buying and selling process.  
        Customer satisfaction and trust are at the core of everything we do.
        </p>
      </div>

      {/* img section  */}
      <div className="w-full md:w-2/5">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};
export default Approch;