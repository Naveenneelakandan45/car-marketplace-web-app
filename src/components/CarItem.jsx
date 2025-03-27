import React from 'react';
import { LuFuel } from "react-icons/lu";
import { Separator } from './ui/separator';
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';

function CarItem({ car }) {
  if (!car) return <p className="text-red-500">Car details unavailable</p>;

  return (
    <Link to={'/listing-details/'+car?.id}>
    <div className="rounded-xl bg-white border hover:shadow-md cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105">
      
      {/* New/Used Tag */}
      <h2 className={`absolute m-2 px-2 rounded-full text-sm text-white ${car?.condition === 'New' ? 'bg-green-600' : 'bg-gray-600'}`}>
        {car?.condition || "Unknown"}
      </h2>

      {/* Car Image */}
      <img 
        src={car?.images?.[0]?.imageUrl || "/placeholder-car.jpg"} 
        width={'100%'} 
        height={250} 
        alt={car?.category || "Car Image"} 
        className="rounded-t-xl object-cover h-48 w-full"
      />

      <div className="p-4">
        {/* Car Title */}
        <h2 className="font-bold text-black text-lg mb-2">
          {car?.listingTitle || "Unknown Listing"}
        </h2>
        <Separator />

        {/* Car Features */}
        <div className="grid grid-cols-3 mt-5 gap-2">
          <div className="flex flex-col items-center">
            <LuFuel className="text-lg mb-1"/>
            <h2 className="text-sm">{car?.mileage ? `${car.mileage} Miles` : "Mileage N/A"}</h2>
          </div>
          <div className="flex flex-col items-center">
            <TbBrandSpeedtest className="text-lg mb-1" />
            <h2 className="text-sm">{car?.fuelType || "Fuel Type N/A"}</h2>
          </div>
          <div className="flex flex-col items-center">
            <GiGearStickPattern className="text-lg mb-1" />
            <h2 className="text-sm">{car?.transmission || "Transmission N/A"}</h2>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Price & View Details */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">${car?.sellingPrice || "N/A"}</h2>
          <h2 className="text-blue-700 text-sm flex gap-2 items-center cursor-pointer hover:underline">
            View Details <IoMdOpen />
          </h2>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default CarItem;
