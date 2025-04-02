import { UserButton, useUser, SignInButton } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate(); // React Router navigation

  const handleSubmitListing = () => {
    if (isSignedIn) {
      navigate("/profile"); // Redirect to Add Listing if signed in
    } else {
      navigate("/sign-in"); // Redirect to Sign In if not signed in
    }
  };

  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to="/">
        <img src="logo.svg" width={50} height={50} alt="Logo" />
      </Link>
      <ul className="hidden md:flex gap-16">
        <Link to="/" className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Home</Link>
        <Link to="/search" className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">Search</Link>
        <Link to="/new" className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">New</Link>
        <Link to="/predict" className=" font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
        Know Your Car’s Worth
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
