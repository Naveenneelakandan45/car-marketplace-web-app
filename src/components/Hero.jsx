import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Search from './Search';

function Hero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]'>
      <h2 className='text-lg' data-aos="fade-down">Find cars for sale and for rent near you</h2>
      <h2 className='text-[60px] font-bold' data-aos="fade-down" data-aos-delay="200">Find Your Dream Car</h2>
        <Search />

      <img
        src="tesla.jpg"
        className='mt-10'
        data-aos="fade-right" // Moves from left to right with a fade
        data-aos-delay="600"
        alt="Tesla Car"
      />
    </div>
  );
}

export default Hero;
