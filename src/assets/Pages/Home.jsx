
import React from "react";
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer";
import Body from "./Body";
import ImageSlider from "./Imageslider";
import TrendingProducts from "./TrendingProducts";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ImageSlider/>
        <TrendingProducts />
        <Body />
      </main>
      <Footer />
    </div>
  );
}

export default Home;