import React from "react";
import img from "../../src/assets/img/vision.jpg";

const Vision = () => {
  return (
    <div className=" flex flex-col justify-center md:flex-row items-center gap-5 mt-16">
      {/* img section  */}
      <div className="w-full md:w-2/5">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>

      {/* content section  */}
      <div className="w-full md:w-2/4 space-y-4">
        <h1 className=" text-4xl font-bold ">Our <span className="text-orange-700">Vision</span></h1>

        <h2 className=" font-semibold text-lg lg:text-2xl">
        Redefine the car marketplace by making it more accessible, transparent, and efficient.  
        </h2>
        <p className=" text-sm lg:text-base">
        We strive to create a seamless experience where buyers and sellers connect with confidence.  
        </p>
        <p className=" text-sm lg:text-base">
        Through innovation and technology, we aim to build a future where car transactions are smarter and more reliable.  
        Our platform leverages AI and market analytics to ensure fair pricing for all.  
        We believe in sustainability and promote eco-friendly mobility solutions.  
        By prioritizing customer satisfaction, we set new standards in the automotive marketplace.  
        </p>
      </div>
    </div>
  );
};

export default Vision;
