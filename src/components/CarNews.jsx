import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import CarNewsCard from "./CarNewsCard";
const img1 = new URL("../assets/img/news1.jpg", import.meta.url).href;
const img2 = new URL("../assets/img/news2.jpg", import.meta.url).href;
const img3 = new URL("../assets/img/news3.jpg", import.meta.url).href;
const img4 = new URL("../assets/img/news4.jpg", import.meta.url).href;
const img5 = new URL("../assets/img/news5.jpg", import.meta.url).href;
const img6 = new URL("../assets/img/news6.jpg", import.meta.url).href;


const CarNews = () => {
    useEffect(() => {
        // Initialize AOS with desired settings
        AOS.init({
          duration: 1000,  // Animation duration
          once: false,   // Ensure animation only triggers once
          offset:100   
        });
      }, []);
    

    const newsData = [
        { id: 0, img: img1, desc: "Toyota touts internal combustion engine potential, even in EV age" },
        { id: 1, img: img2, desc: "BMW Group India clocks best-ever annual sales in 2023, leads luxury electric car segment" },
        { id: 2, img: img3, desc: "MG Astor 2024 launched in India, price starts at Rs 9.98 lakh" },
        { id: 3, img: img4, desc: "Kia Sonet facelift launched in India at Rs 7.99 lakh, Tata Nexon & Maruti Suzuki Brezza rival" },
        { id: 4, img: img5, desc: "First Shift: New-vehicle inventory reaches 3-year high" },
        { id: 5, img: img6, desc: "JLR India sales rise 74% in Q3 on robust demand for Range Rover, Range Rover Velar, Defender" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024, // Tablets
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768, // Mobile
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div   data-aos="fade-up" className="w-full mt-14">
            <h1 className="font-bold text-4xl text-center">
                Cars <span className="text-primary">News & Advices</span>
            </h1>
            <p className="text-center font-semibold">
            Stay updated with the latest car trends, expert advice, and breaking news from the automotive world.
             Get insights on new launches, reviews, and industry updates!
            </p>
            <div className="w-full mt-8 px-0">
                <Slider {...settings}>
                    {newsData.map((item) => (
                        <div className="w-full px-2" key={item.id}> {/* Full width wrapper */}
                            <CarNewsCard img={item.img} desc={item.desc} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CarNews;
