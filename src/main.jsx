import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./profile";
import AddListing from "./add-listing";
import { Toaster } from "./components/ui/sonner";
import SearchByCategory from "./search/[category]";
import SearchByOptions from "./search";
import ListingDetail from "./listing-details/[id]";
import CarPricePredict from "./components/Carpricepredict";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/add-listing",
    element: <AddListing />,
  },
  {
    path:'/search/:category',
    element:<SearchByCategory/>
  },
  {
    path:'/search/',
    element:<SearchByOptions/>
  },
  {
    path:'/listing-details/:id',
    element:<ListingDetail/>
  },
  {
    path: "/predict",
    element: <CarPricePredict />,
  },
  
  // Optional: Add a fallback 404 page
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in .env");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {import.meta.env.MODE === "development" && false ? (
  <p>Authentication Disabled in Dev Mode</p>
) : (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
)}
    <Toaster />
  </React.StrictMode>
);
