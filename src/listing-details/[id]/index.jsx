import Header from './../../components/Header';
import React, { useEffect, useState, useCallback } from 'react';
import DetailHeader from '../components/DetailHeader';
import { useParams } from 'react-router-dom';
import { db } from './../../../configs';
import { CarImages, CarListing } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import { FormatResult } from '@/components/Shared/Service';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OwnersDetail from '../components/ownersDetail';
import Footer from '@/components/Footer';
import FinancialCalculator from '../components/FinancialCalculator';
import MostSearchedCar from '@/components/MostSearchedCar';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function ListingDetail() {
    const { id } = useParams();
    const [carDetail, setCarDetail] = useState();

    const GetCarDetail = useCallback(async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, id));

        const resp = FormatResult(result);
        setCarDetail(resp[0]);
    }, [id]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: false, offset: 100 });

         window.scrollTo({ top: 0, behavior: 'smooth' });
        GetCarDetail();
    }, [id, GetCarDetail]);

    return (
        <div data-aos="fade-up">
            <Header />
            <div className='p-10 md:px-20'>
                <DetailHeader carDetail={carDetail} />
                <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
                    <div className='md:col-span-2'>
                        <ImageGallery carDetail={carDetail} />
                        <Description carDetail={carDetail} />
                        <Features features={carDetail?.features} />
                        <FinancialCalculator carDetail={carDetail} />
                    </div>
                    <div>
                        <Pricing carDetail={carDetail} />
                        <Specification carDetail={carDetail} />
                        <OwnersDetail carDetail={carDetail} />
                    </div>
                </div>
                <div className="w-full mt-10">
                    <MostSearchedCar />
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ListingDetail;
