import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, });
    
  }, []);

  const handleSubmitListing = () => {
    if (isSignedIn) {
      navigate("/profile");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div
      className="flex justify-between items-center shadow-sm p-5"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <Link to="/">
        <div className="flex justify-between items-center gap-4">
          <img src="logo.svg" width={50} height={50} alt="Logo" />
          <h2 className="font-bold text-2xl">
            Wheels<span className="text-blue-600">Deal</span>
          </h2>
        </div>
      </Link>
      <ul className="hidden md:flex gap-16">
        <Link
          to="/"
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
        >
          Home
        </Link>
        <Link
          to="/search"
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
        >
          Search
        </Link>
        <Link
          to="/aboutUs"
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
        >
          About Us
        </Link>
        <Link
          to="/predict"
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
        >
          Know Your Car’s Worth
        </Link>
        <Link
          to="/CarViewer"
          className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary"
        >
          View Car in 3D
        </Link>
      </ul>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <UserButton />
          <Button onClick={handleSubmitListing}>Submit Listing</Button>
        </div>
      ) : (
        <SignInButton mode="modal">
          <Button>Sign In to Submit Listing</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Header;
