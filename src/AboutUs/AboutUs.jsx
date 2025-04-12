import React from "react";
import Vision from "./Vision";
import Approch from "./Approch";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="mt-2">
      <div className="bg-black">
        <h1 className=" font-bold text-white text-4xl text-center">
          About <span className=" text-orange-400">US</span>
        </h1>
      </div>

      <Vision />
      <Approch />
      <Footer/>
    </div>
  );
};

export default AboutUs;