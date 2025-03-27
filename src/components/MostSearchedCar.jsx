import React, { useEffect, useState } from 'react'
import CarItem from './CarItem';
import { db } from './../../configs';
import { CarImages, CarListing } from './../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import { FormatResult } from './Shared/Service';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function MostSearchedCar() {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    GetPopularCarListing();
  }, []);

  const GetPopularCarListing = async () => {
    try {
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
    }
  };

  return (
    <div className='mx-24'>
      <h2 className='font-bold text-3xl text-center mt-16 mb-7 '>Most Searched Cars</h2>

      <Carousel>
        <CarouselContent>
          {carList.length > 0 ? (
            carList.map((car, index) => (
              <CarouselItem key={index} className='basis-1/4'> 
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
    </div>
  );
}

export default MostSearchedCar;
