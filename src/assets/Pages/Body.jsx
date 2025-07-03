import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Body() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Baby Clothes",
      image: "https://images.unsplash.com/photo-1649176636526-f7443d8259ec?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/categorylist/cloths",
      color: "bg-pink-100"
    },
    {
      name: "Toys",
      image: "https://images.unsplash.com/photo-1505043203398-7e4c111acbfa?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/categorylist/toys",
      color: "bg-blue-100"
    },
    {
      name: "Magical Steps",
      image: "https://images.unsplash.com/photo-1625657332021-9b714782dde0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/categorylist/Magicalsteps",
      color: "bg-purple-100"
    }
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 font-serif">
          Discover Baby Treasures
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Premium collections for your little one's comfort and joy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ${category.color} group`}
              onClick={() => navigate(category.path)}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"  
                  onError={(e) => {
                    e.target.src = "https://img.freepik.com/free-vector/hand-drawn-baby-shower-background_23-2149430425.jpg";
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                <button className="mt-3 px-6 py-2  bg-fuchsia-200 hover:bg-pink-700 text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Shop Now →
                </button>
              </div>
              
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button 
            className="px-8 py-3 bg-pink-600  hover:bg-pink-700 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
            onClick={() => navigate('/products')}
          >
            View All Collections
          </button>
        </div>
      </div>
    </div>
  );
}