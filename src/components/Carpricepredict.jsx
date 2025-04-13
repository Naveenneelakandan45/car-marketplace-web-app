import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
const CarPricePredict = () => {
  useEffect(() => {
    // Initialize AOS with desired settings
    AOS.init({
      duration: 1000,  // Animation duration
      once: false,   // Ensure animation only triggers once
      offset:100   
    });

  }, []);
     
    const [formData, setFormData] = useState({
        year: 2020,
        present_price: 500000,
        kms_driven: 22000,
        fuel_type: "Diesel",
        seller_type: "Individual",
        transmission: "Automatic",
        owner: 1
    });

    const [predictedPrice, setPredictedPrice] = useState(null); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Predicted Price:", data.predicted_price); 
            setPredictedPrice(data.predicted_price);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
      <div  data-aos="fade-up" className="relative min-h-screen flex items-center justify-center">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="background1.mp4" type="video/mp4" />
        </video>

        {/* Larger Transparent Form Container */}
        <div className="relative z-10 bg-white bg-opacity-5 p-10 rounded-2xl w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Car Price Prediction</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold text-white text-lg">Year:</label>
              <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent text-white text-lg" />
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Present Price:</label>
              <input type="number" name="present_price" value={formData.present_price} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent text-white text-lg" />
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Kilometers Driven:</label>
              <input type="number" name="kms_driven" value={formData.kms_driven} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent text-white text-lg" />
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Fuel Type:</label>
              <select name="fuel_type" value={formData.fuel_type} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent text-white text-lg">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Seller Type:</label>
              <select name="seller_type" value={formData.seller_type} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent text-white text-lg">
                <option value="Dealer">Dealer</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Transmission:</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full p-3 rounded-lg bg-transparent text-white text-lg">
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
            
            <div>
              <label className="block font-semibold text-white text-lg">Previous Owners:</label>
              <input type="number" name="owner" value={formData.owner} onChange={handleChange} required className="w-full p-3 rounded-lg bg-transparent text-white text-lg" />
            </div>
            
            <button type="submit" className="w-full p-4 mt-6 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition">Predict Price</button>
          </form>
          
          {/* Display predicted price */}
          {predictedPrice !== null && (
            <h3 className="mt-6 text-center text-2xl font-bold text-white">Predicted Selling Price: ₹{predictedPrice.toFixed(2)}</h3>
          )}
        </div>
      </div>
    );
};

export default CarPricePredict;
