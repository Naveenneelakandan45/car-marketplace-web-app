import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function InfoSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // change to `true` if you want it to animate only once
    });
  }, []);

  return (
    <section className="w-screen h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        
        {/* Video Section - Animate right to left */}
        <div
          data-aos="fade-left"
          data-aos-delay="100"
          className="flex items-center justify-center bg-black"
        >
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
          >
            <source src="background3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Section - Animate right to left, after video */}
        <div
          data-aos="fade-left"
          data-aos-delay="400"
          className="flex items-center justify-center p-12 bg-white"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900">
              Lamborghini Revuelto – The Future of Supercars
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              The Lamborghini Revuelto is an electrified hypercar that combines a V12 engine with advanced hybrid technology.
              Featuring an ultra-lightweight chassis, breathtaking aerodynamics, and an unmatched driving experience,
              it redefines the boundaries of speed and innovation. Accelerating from 0-100 km/h in under 2.5 seconds,
              this beast is built for those who crave adrenaline and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoSection;
