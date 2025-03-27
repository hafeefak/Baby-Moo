import React from 'react';
import { FaFacebook, FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";


function Footer() {
  return (
    <footer className="bg-[#F5BAC7] text-white lg:px-16 px-8 lg:pt-12 pb-8 ">
      

        <div className="flex flex-wrap justify-between items-start gap-10 lg:flex-nowrap">
            <div className="flex flex-col items-start">
                <h2 className="text-3xl font-bold mb-4  text-white">Baby Moo</h2>
                <p className="text-sm  text-white max-w-xs">
                Your one-stop destination for high-quality baby products. We’re here to bring joy to you and your little ones.
                </p>
                <div className="flex items-center gap-4 mt-6 ">
                
                    <FaFacebook className="text-white text-lg w-10 h-10 transition-transform duration-300 hover:scale-110 " />
                
                    <FaInstagramSquare className="text-white text-lg w-10 h-10 transition-transform duration-300 hover:scale-110 " />
                
                    <FaTwitterSquare className="text-white text-lg w-10 h-10 transition-transform duration-300 hover:scale-110 " />
                
                </div>
            </div>
            <div className="mb-6 lg:mb-0">
                    <h4 className="text-xl font-semibold mb-4 text-white">
                        Customer Care
                    </h4>
                    <ul className="space-y-2">
                        <li className=" text-white">Timing: 10 AM - 7 PM (Mon - Sat)</li>
                        <li className=" text-white">Email: BabyMoo@gmail.com</li>
                        <li className=" text-white">Call/WhatsApp: +91 9400112833</li>
                    </ul>
                </div>
          </div>
        
        <div className="mt-10 border-t bg-[#F5BAC7] pt-6 text-center text-sm  text-white">
          &copy; {new Date().getFullYear()} Baby Moo. All rights reserved.
        </div>
      
    </footer>
  );
}

export default Footer;