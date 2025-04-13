import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles
import Data from './Shared/Data';
import { Link } from 'react-router-dom';

function Category() {
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Set animation duration
      once: false,     // Ensures animation triggers each time the element comes into view
      offset: 100,     // Offset for when the animation starts
    });
  }, []);

  return (
    <div className='mt-40'>
      <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 
      lg:grid-cols-9 gap-6 px-20">
        {Data.Category.map((category, index) => (
          <Link to={'search/' + category.name} key={index}>
            <div
              className='border rounded-md p-3 items-center flex flex-col hover:shadow-md cursor-pointer'
              data-aos="fade-up" // Trigger fade-up animation when this element comes into the viewport
              data-aos-delay={`${index * 100}`} // Delay animation slightly for each item
            >
              <img src={category.icon} width={40} height={40} alt={category.name} />
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
