import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function InfoSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    
    });
  }, []);

  return (
    <div className='mt-12'>
      <section className="w-screen h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Text Section */}
          <div
            className="flex items-center justify-center p-12 bg-white shadow-lg"
            data-aos="fade-left"         // Animate right to left
            data-aos-delay="100"         // Delay for staggering
          >
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-900">
                Tesla Model S – The Ultimate Electric Luxury Sedan
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                The Tesla Model S is a high-performance electric sedan known for its sleek design and cutting-edge technology.
                It offers an impressive range of over 400 miles and can accelerate from 0-100 km/h in just around two seconds (Plaid variant).
                Equipped with Tesla's Autopilot and Full Self-Driving capabilities,
                it delivers an advanced and futuristic driving experience.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div
            data-aos="fade-left"          // Same direction animation
            data-aos-delay="400"          // Delay after text animates
          >
            <img
              src="https://wallpapercat.com/w/full/4/b/a/3620-1920x1080-desktop-full-hd-tesla-wallpaper-photo.jpg"
              className="w-full h-full object-cover"
              alt="Tesla Model S"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default InfoSection;
