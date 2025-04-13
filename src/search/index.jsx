
import { FormatResult } from '@/components/Shared/Service';
import { db } from './../../configs';
import { CarImages, CarListing } from './../../configs/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import AOS from 'aos';
import 'aos/dist/aos.css';

function SearchByOptions() {
    const [searchParam] = useSearchParams();
    const [carlist,setCarList] = useState([]);
    const condition=searchParam.get('cars');
    const make=searchParam.get('make');
    const price=searchParam.get('price');
  


  useEffect(()=>{
    AOS.init({
      duration: 1000,  // Animation duration
      once: false,   // Ensure animation only triggers once
      offset:100   
    });
    GetCarList();
  },[])
  const GetCarList=async()=>{
    const result = await db.select().from(CarListing)
    .innerJoin(CarImages,eq(CarListing.id,CarImages.carListingId))
    .where(condition!=undefined&&eq(CarListing.condition,condition))
    .where(make!=undefined&&eq(CarListing.make,make))

    const resp = FormatResult(result);
    console.log(resp);
    setCarList(resp);
  }
  return (
       <div 
       data-aos="fade-up">
         <Header/>
         <div className='p-16 bg-black flex justify-center'>
           <Search/>
         </div>
   
         <div className='p-10 md:px-20'>
             <h2 className='font-bold text-4xl'>Search Result</h2>
             {/* list of carlist */}
           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7'>
             {carlist?.length>0? carlist.map((item,index)=>(
               <div key={index}>
                     <CarItem car={item}/>
               </div>
             )):
             [1,2,3,4,5,6].map((item,index)=>(
               <div className='h-[320px] rounded-xl bg-slate-200 animate-pulse'>
                   
               </div>
             ))
             }
             </div>
         </div>
       </div>
  )
}

export default SearchByOptions
