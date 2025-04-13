import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from "react";

const Footer = () => {
  
  useEffect(() => {
    // Initialize AOS with desired settings
    AOS.init({
      duration: 1000,  // Animation duration
      once: false,   // Ensure animation only triggers once
      offset:100   
    });
  }, []);
  return (
    <footer   data-aos="fade-up" className="bg-slate-200 text-black py-12">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        
       
        <div>
          <h2 className="text-3xl font-bold">Wheels<span className="text-orange-600">Deal</span></h2>
          <p className="mt-3 text-sm">
            Your trusted car marketplace, where buying and selling cars is smooth, secure, and hassle-free.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/" className="hover:text-blue-500 transition-all">🏠 Home</a></li>
            <li><a href="/aboutUs" className="hover:text-blue-500 transition-all">ℹ️ About Us</a></li>
            <li><a href="/search" className="hover:text-blue-500 transition-all">🚗 Browse Cars</a></li>
            <li><a href="/contact" className="hover:text-blue-500 transition-all">📞 Contact Us</a></li>
          </ul>
        </div>

        {/* 🔹 Contact Info */}
        <div>
          <h3 className="text-xl font-semibold">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 123 Auto Street, Car City
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +123 456 7890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@wheelsdeal.com
            </li>
          </ul>
        </div>

        {/* 🔹 Follow Us */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-blue-500 transition-all"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-blue-500 transition-all"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-blue-500 transition-all"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-blue-500 transition-all"><FaLinkedinIn size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-blue-300 pt-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold">WheelsDeal</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
