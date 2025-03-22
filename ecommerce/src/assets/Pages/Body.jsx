import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Body() {
    const navigate = useNavigate();

    const handleShopClick = () => {
        navigate('/products');
    };

    return (
        <div className="w-screen min-h-screen">
            
            <div
                className="relative w-full h-screen bg-cover bg-center"
                style={{ backgroundImage: "url(https://babymoo.in/cdn/shop/files/footwear_web.jpg?v=1694840774&width=3000)" }}
            >
                
                <div className="absolute inset-0 opacity-40"></div>

            
                <button
                    onClick={handleShopClick}
                    className="absolute bottom-8 right-8 bg-pink-400 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-xl shadow-lg hover:bg-pink-500 transition-transform transform hover:scale-105"
                >
                    Explore
                </button>

               
                
            </div>

            <div className="max-w-7xl mx-auto mt-16 text-center pb-14 px-4">
                <h2 className="text-xl sm:text-3xl font-bold mb-12 text-gray-800">
                    Explore Our Collection
                </h2>

                <div className="flex justify-center flex-wrap gap-8 sm:gap-16">
                    
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/categorylist/cloths')}>
                        <img
                            src="https://babymoo.in/cdn/shop/files/apparel.jpg?v=1699602237&width=1200"
                            alt="Cloths"
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                        <p className="mt-4 font-semibold text-lg">Cloths</p>
                    </div>

              
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/categorylist/toys')}>
                        <img
                            src="https://babymoo.in/cdn/shop/files/Toy.jpg?v=1730705815&width=500"
                            alt="toys"
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                        <p className="mt-4 font-semibold text-lg">Toys</p>
                    </div>

                    
                    <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/categorylist/Magicalsteps')}>
                        <img
                            src="https://babymoo.in/cdn/shop/files/Footwear.jpg?v=1730705815&width=500"
                            alt="Magicalsteps"
                            className="w-32 h-32 sm:w-48 sm:h-48 rounded-full object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                        />
                        <p className="mt-4 font-semibold text-lg">Magical Steps</p>
                    </div>
                </div>
            </div>

            
        </div>
    );
}
