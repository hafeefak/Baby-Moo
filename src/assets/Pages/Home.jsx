
import React from "react";
import Navbar from '../Components/Navbar'

import Footer from "../Components/Footer";

import Body from "./Body";
import ImageSlider from "./Imageslider";



function Home() {


  return (
    <div>
      <Navbar />
      <ImageSlider/>
       <Body />
       
       <Footer />
       
    </div>
  );
}

export default Home;
