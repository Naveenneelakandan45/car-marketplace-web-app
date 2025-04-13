import React, { useEffect, useState } from 'react'
import CarItem from './CarItem';
import { db } from './../../configs';
import { CarImages, CarListing } from './../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { FormatResult } from './Shared/Service';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function MostSearchedCar() {
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize AOS with desired settings
    AOS.init({
      duration: 1000,  // Animation duration
      once: false,   // Ensure animation only triggers once
      offset:100   
    });

    // Get popular car listings
    GetPopularCarListing();
  }, []);

  const GetPopularCarListing = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(10)
        .execute();

      const resp = FormatResult(result);
      console.log("Formatted Response:", resp);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching popular car listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7'>Most Searched Cars</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Carousel>
          <CarouselContent>
            {carList.length > 0 ? (
              carList.map((car, index) => (
                <CarouselItem
                  key={index}
                  className='basis-1/4'
                  data-aos="fade-up"  // Add the AOS animation here
                  data-aos-delay={`${index * 100}`}  // Delay based on index for staggered animation
                >
                  <CarItem car={car} />
                </CarouselItem>
              ))
            ) : (
              <p className="text-center text-gray-500">No popular cars found.</p>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}

export default MostSearchedCar;
