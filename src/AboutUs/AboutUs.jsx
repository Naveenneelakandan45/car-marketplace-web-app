import React, { useEffect } from "react";
import Vision from "./Vision";
import Approch from "./Approch";
import Footer from "@/components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const AboutUs = () => {
  useEffect(() => {
    // Initialize AOS with desired settings
    AOS.init({
      duration: 1000,  // Animation duration
      once: false,   // Ensure animation only triggers once
      offset:100   
    });

  }, []);
  return (
    <div data-aos="fade-up" className="mt-2">
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